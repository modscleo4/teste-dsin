'use strict'

class UpdateStatusSchedule {
  get rules() {
    return {
      status: 'required|in:S,P,M',
    }
  }
}

module.exports = UpdateStatusSchedule
