'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ServiceSchema extends Schema {
  up() {
    this.create('services', (table) => {
      table.increments()
      table.string('name').notNullable()
      table.decimal('price', 7, 2).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('services')
  }
}

module.exports = ServiceSchema
