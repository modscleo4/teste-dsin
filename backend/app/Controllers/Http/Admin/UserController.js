'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const User = use('App/Models/User')
const Role = use('Role')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const { role } = request.only('role')
    const roles = Array.from((await Role.all()).rows).map(r => r.slug).filter(r => r === (role || r))

    return await User.query().with('roles').whereHas('roles', builder => {
      builder.whereIn('slug', roles)
    }).orderBy('id').fetch()
  }

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const trx = await Database.beginTransaction()

    try {
      const data = request.only(['name', 'email', 'password', 'role_id', 'active'])

      const user = await User.create(data, trx)
      await user.roles().sync([role])

      await trx.commit()

      return user
    } catch (e) {
      await trx.rollback()
    }
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    await user.load('roles')

    return user
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const user = await User.findOrFail(params.id)
    // Você não pode editar a si mesmo
    if (auth.user.id === user.id) {
      return {
        message: "You cannot edit yourself"
      }
    }

    const trx = await Database.beginTransaction()

    try {
      // Não alterar a senha
      const data = request.only(['name', 'email', 'role_id', 'active'])

      user.merge(data)
      await user.save(trx)
      await user.roles().sync([role])

      await trx.commit()

      return user
    } catch (e) {
      await trx.rollback()
    }
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response, auth }) {
    const user = await User.findOrFail(params.id)
    // Você não pode excluir a si mesmo
    if (auth.user.id === user.id) {
      return {
        message: "You cannot delete yourself"
      }
    }

    const trx = await Database.beginTransaction()

    try {
      await user.delete(trx)
      await trx.commit()

      return user
    } catch (e) {
      await trx.rollback()
    }
  }
}

module.exports = UserController
