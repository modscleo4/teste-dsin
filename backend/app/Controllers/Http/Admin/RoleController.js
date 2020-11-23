'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Role = use('Role')

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
    /**
     * Show a list of all roles.
     * GET roles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({ request, response }) {
        return await Role.query().orderBy('id').fetch()
    }

    /**
     * Display a single role.
     * GET roles/:id
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async show({ params, request, response }) {
        const role = await Role.findOrFail(params.id)

        return role
    }
}

module.exports = RoleController
