'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleServiceSchema extends Schema {
  up() {
    this.create('schedule_service', (table) => {
      table.increments()
      table.integer('schedule_id').unsigned().references('id').inTable('schedules').onUpdate('cascade').onDelete('cascade')
      table.integer('service_id').unsigned().references('id').inTable('services').onUpdate('cascade').onDelete('cascade')
      table.enum('status', ['W', 'D']).notNullable().default('W').comment('W->Waiting, D->Done')
      table.timestamps()
    })
  }

  down() {
    this.drop('schedule_service')
  }
}

module.exports = ScheduleServiceSchema
