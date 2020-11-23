'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ScheduleSchema extends Schema {
  up() {
    this.create('schedules', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('cascade').onDelete('cascade')
      table.timestamp('date')
      table.text('note')
      table.enum('status', ['S', 'P', 'M']).notNullable().default('S').comment('S->Scheduled, P->Paid, M->Missed')
      table.timestamps()
    })
  }

  down() {
    this.drop('schedules')
  }
}

module.exports = ScheduleSchema
