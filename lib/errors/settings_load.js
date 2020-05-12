'use strict'

class SettingsLoadError extends Error {
  constructor (path, reason) {
    const message = `Failed to read settings file from ${path}: ${reason}`
    super(message)

    this.name = 'SettingsLoad'
  }
}

module.exports = SettingsLoadError
