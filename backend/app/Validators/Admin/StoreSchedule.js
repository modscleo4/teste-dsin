'use strict'

class StoreSchedule {
  get rules() {
    return {
      user_id: 'required|exists:users,id',
      date: 'required|date',
      note: 'max:8000',

      services: 'required|array',
      'services.*': 'required|exists:services,id'
    }
  }
}

module.exports = StoreSchedule
