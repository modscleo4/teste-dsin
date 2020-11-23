'use strict'

const Database = use('Database')
const { validate } = use('Validator')
const User = use('App/Models/User')
const Role = use('Role')

class RegisterController {
  rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users,email',
      phone: 'required|integer|max:11',
      password: 'required',
    }
  }

  async register({ request, auth }) {
    const data = request.only(['name', 'email', 'phone', 'password'])

    const validation = await validate(data, this.rules())
    if (validation.fails()) {
      return validation.messages()
    }

    const trx = await Database.beginTransaction()
    try {
      const user = await User.create(data, trx)

      const role = await Role.findBy('slug', 'client')
      await user.roles().attach([role.id], null, trx)
      await trx.commit()

      await user.load('roles')

      const token = await auth.attempt(data.email, data.password)

      return { user, token }
    } catch (e) {
      trx.rollback()
      return null
    }
  }
}

module.exports = RegisterController
