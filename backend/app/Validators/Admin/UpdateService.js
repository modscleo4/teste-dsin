'use strict'

class UpdateService {
  get rules() {
    return {
      name: 'required',
      price: 'required|number',
    }
  }
}

module.exports = UpdateService
