'use strict'

class UpdateSchedule {
  get rules() {
    return {
      date: 'required|date',
      note: 'max:8000',

      services: 'required|array',
      'services.*': 'required|exists:services,id'
    }
  }
}

module.exports = UpdateSchedule
