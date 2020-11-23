'use strict'

class UpdateStatusSchedule {
  get rules() {
    return {
      status: 'required|in:W,D',
    }
  }
}

module.exports = UpdateStatusSchedule
