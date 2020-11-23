'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const Service = use('App/Models/Service')

/**
 * Resourceful controller for interacting with services
 */
class ServiceController {
  /**
   * Show a list of all services.
   * GET services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    return await Service.query().orderBy('id').fetch()
  }

  /**
   * Create/save a new service.
   * POST services
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['name', 'price'])

      const service = await Service.create(data, trx)

      await trx.commit()

      return service
    } catch (e) {
      await trx.rollback()
    }
  }

  /**
   * Display a single service.
   * GET services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const service = await Service.findOrFail(params.id)

    return service
  }

  /**
   * Update service details.
   * PUT or PATCH services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const service = await Service.findOrFail(params.id)
    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['name', 'price'])

      service.merge(data)
      await service.save(trx)

      await trx.commit()

      return service
    } catch (e) {
      await trx.rollback()
    }
  }

  /**
   * Delete a service with id.
   * DELETE services/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const service = await Service.findOrFail(params.id)
    const trx = await Database.beginTransaction()

    try {
      await service.delete(trx)
      await trx.commit()

      return service
    } catch (e) {
      await trx.rollback()
    }
  }
}

module.exports = ServiceController
