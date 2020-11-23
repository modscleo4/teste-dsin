'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
/** @typedef {import('@adonisjs/auth/src/Auth')} Auth */

const { HttpException } = use('@adonisjs/generic-exceptions')
const Database = use('Database')
const Schedule = use('App/Models/Schedule')
const { daysDiff } = use('App/helpers')

/**
 * Resourceful controller for interacting with schedules
 */
class ScheduleController {
  /**
   * Show a list of all schedules.
   * GET schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async index({ request, response, auth }) {
    return await auth.user.schedules().with('services').orderBy('id').fetch()
  }

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({ request, response, auth }) {
    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['date', 'note'])
      const schedule = await Schedule.create({ ...data, user_id: auth.user.id }, trx)

      await schedule.services().sync(request.only(['services']).services, null, trx)

      await trx.commit()

      await schedule.load('services')

      return schedule
    } catch (e) {
      await trx.rollback()
    }
  }

  /**
   * Display a single schedule.
   * GET schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async show({ params, request, response, auth }) {
    const schedule = await auth.user.schedules().with('services').where('id', '=', params.id).firstOrFail()

    return schedule
  }

  /**
   * Update schedule details.
   * PUT or PATCH schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async update({ params, request, response, auth }) {
    const schedule = await auth.user.schedules().where('id', '=', params.id).firstOrFail()
    // Solicitado: cliente alterar o agendamento pelo sistema até 2 dias antes do agendado
    if (daysDiff(new Date(), schedule.date) < 2) {
      throw new HttpException('Unauthorized', 403)
    }

    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['date', 'note'])
      schedule.merge(data)

      await schedule.save(trx)

      await schedule.services().sync(request.only(['services']).services, null, trx)

      await trx.commit()

      await schedule.load('services')

      return schedule
    } catch (e) {
      await trx.rollback()
    }
  }

  /**
   * Delete a schedule with id.
   * DELETE schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async destroy({ params, request, response, auth }) {
    const schedule = await auth.user.schedules().where('id', '=', params.id).firstOrFail()
    // Solicitado: cliente alterar o agendamento pelo sistema até 2 dias antes do agendado
    if (daysDiff(new Date(), schedule.date) < 2) {
      throw new HttpException('Unauthorized', 403)
    }

    const trx = await Database.beginTransaction()

    try {
      await schedule.delete(trx)
      await trx.commit()

      return schedule
    } catch (e) {
      await trx.rollback()
    }
  }
}

module.exports = ScheduleController
