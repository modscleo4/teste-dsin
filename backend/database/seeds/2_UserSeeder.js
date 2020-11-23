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

const User = use('App/Models/User')
const Role = use('Role')

class UserSeeder {
  async run() {
    const user = await User.create({
      name: 'Administrador',
      email: 'admin@user.com',
      phone: '11900000000',
      password: 'password'
    })

    const role = await Role.findBy('slug', 'admin')
    await user.roles().attach([role.id])
  }
}

module.exports = UserSeeder
