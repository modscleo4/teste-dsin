'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Schedule extends Model {
    services() {
        return this.belongsToMany('App/Models/Service').withPivot(['status'])
    }

    user() {
        return this.belongsTo('App/Models/User')
    }
}

module.exports = Schedule
