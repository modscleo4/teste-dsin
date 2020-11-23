'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use('Database')
const User = use('App/Models/User')
const Schedule = use('App/Models/Schedule')

/**
 * Resourceful controller for interacting with roles
 */
class DashboardController {
    /**
     * Show a list of all roles.
     * GET roles
     *
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Response} ctx.response
     */
    async index({ request, response }) {
        const today = new Date();
        const lastweek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

        return {
            clients: (await User.query().whereHas('roles', builder => {
                builder.whereIn('slug', ['client'])
            }).count())[0].count,

            schedules: (await Schedule.query().where('status', '=', 'S').whereBetween('date', [new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), today]).count())[0].count,

            schedules_paid: (await Schedule.query().where('status', '=', 'P').whereBetween('date', [new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), today]).count())[0].count,

            income: (await Database.raw(`
SELECT SUM(sip.p)
FROM (SELECT schedule_id, SUM(services.price) AS p
      FROM schedules, services
               INNER JOIN schedule_service ss ON services.id = ss.service_id
               INNER JOIN schedules s ON s.id = ss.schedule_id
    WHERE schedules.date BETWEEN ? AND ?
    AND schedules.status = 'P'
    AND ss.status = 'D'
      GROUP BY schedule_id
     ) as sip;
`, [new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), today])).rows[0].sum || "0.00",

            income_lastweek: (await Database.raw(`
SELECT SUM(sip.p)
FROM (SELECT schedule_id, SUM(services.price) AS p
      FROM schedules, services
               INNER JOIN schedule_service ss ON services.id = ss.service_id
               INNER JOIN schedules s ON s.id = ss.schedule_id
    WHERE schedules.date BETWEEN ? AND ?
    AND schedules.status = 'P'
    AND ss.status = 'D'
      GROUP BY schedule_id
     ) as sip;
`, [new Date(lastweek.getTime() - 7 * 24 * 60 * 60 * 1000), lastweek])).rows[0].sum || "0.00",
        }
    }
}

module.exports = DashboardController
