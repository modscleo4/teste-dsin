'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Service extends Model {
    schedules() {
        return this.belongsToMany('App/Models/Schedule').withPivot(['status'])
    }
}

module.exports = Service
