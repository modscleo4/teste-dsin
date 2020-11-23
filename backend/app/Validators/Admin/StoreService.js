'use strict'

class StoreService {
  get rules() {
    return {
      name: 'required',
      price: 'required|number',
    }
  }
}

module.exports = StoreService
