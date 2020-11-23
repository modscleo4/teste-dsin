'use strict'

class StoreUser {
  get rules() {
    return {
      name: 'required',
      email: 'required|unique:users,email',
      password: 'required',
      role_id: 'required|exists:roles,id',
      active: 'required|boolean',
    }
  }
}

module.exports = StoreUser
