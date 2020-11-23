'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Schedule = use('App/Models/Schedule')

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
   */
  async index({ request, response }) {
    return await Schedule.query().with('user').with('services').orderBy('id').fetch()
  }

  /**
   * Create/save a new schedule.
   * POST schedules
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['user_id', 'date', 'note'])

      const schedule = await Schedule.create(data, trx)
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
   */
  async show({ params, request, response }) {
    const schedule = await Schedule.findOrFail(params.id)
    await schedule.load('user')
    await schedule.load('services')

    return schedule
  }

  /**
   * Update schedule details.
   * PUT or PATCH schedules/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const schedule = await Schedule.findOrFail(params.id)
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
   */
  async destroy({ params, request, response }) {
    const schedule = await Schedule.findOrFail(params.id)
    const trx = await Database.beginTransaction()

    try {
      await schedule.delete(trx)
      await trx.commit()

      return schedule
    } catch (e) {
      await trx.rollback()
    }
  }

  async status({ params, request }) {
    const schedule = await Schedule.findOrFail(params.id)
    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['status'])

      schedule.merge(data)
      await schedule.save(trx)

      await trx.commit()

      return schedule
    } catch (e) {
      await trx.rollback()
    }
  }

  async serviceStatus({ params, request }) {
    const schedule = await Schedule.findOrFail(params.id)
    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['status'])

      await schedule.services().detach([params.service_id])
      await schedule.services().attach([params.service_id], row => {
        row.service_id === params.service_id && (row.status = data.status)
      })

      await trx.commit()

      await schedule.load('services')

      return schedule
    } catch (e) {
      await trx.rollback()
    }
  }
}

module.exports = ScheduleController
