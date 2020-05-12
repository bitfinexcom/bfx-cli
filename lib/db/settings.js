'use strict'

const fs = require('fs')
const SettingsLoadError = require('../errors/settings_load')
const wrapError = require('../util/wrap_error')
const { settingsFilename } = require('../../scripts/gen_salt')

const settingsPath = `${__dirname}/../../${settingsFilename}`
let settingsJSON
let settings

try {
  settingsJSON = fs.readFileSync(settingsPath, 'utf-8')
} catch (e) {
  throw new SettingsLoadError(settingsPath, wrapError(e))
}

try {
  settings = JSON.parse(settingsJSON)
} catch (e) {
  throw new SettingsLoadError(settingsPath, wrapError(e))
}

module.exports = settings
