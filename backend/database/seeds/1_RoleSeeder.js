'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Role = use('Role')

class UserSeeder {
  async run() {
    await Role.create({
      slug: 'admin',
      name: 'Administrador',
      description: 'Administrador do sistema',
    })

    await Role.create({
      slug: 'client',
      name: 'Cliente',
      description: 'Cliente do sistema',
    })
  }
}

module.exports = UserSeeder
