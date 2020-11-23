'use strict'

const { validate } = use('Validator')
const User = use('App/Models/User')

class LoginController {
  rules() {
    return {
      email: 'required|email|exists:users,email',
      password: 'required',
    }
  }

  fields(request) {
    return request.only(['email', 'password'])
  }

  async login({ request, auth }) {
    const { email, password } = this.fields(request)

    const validation = await validate({ email, password }, this.rules())
    if (validation.fails()) {
      return validation.messages()
    }

    const user = await User.findBy('email', email)
    if (!user.active) {
      return { active: false }
    }

    await user.load('roles')

    const token = await auth.attempt(email, password)

    return token.token ? { user, token } : { token }
  }
}

module.exports = LoginController
