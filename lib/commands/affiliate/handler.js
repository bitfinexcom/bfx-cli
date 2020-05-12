'use strict'

const fs = require('fs')

const log = require('../../util/log')
const {
  settingsFilename,
  generate: generateSettings
} = require('../../../scripts/gen_salt')

/**
  * Sets the affiliate code in the settings file, regenerating the file if it
  * is corrupt.
  *
  * @param {Object} args - from yargs
  */
module.exports = (args) => {
  const { code } = args

  let settingsJSON
  let settings = null
  let readTries = 0

  while (readTries < 2) {
    try {
      settingsJSON = fs.readFileSync(`${__dirname}/../../../${settingsFilename}`, 'utf-8')
    } catch (e) {
      log('failed to read settings file: %s'.red, e)
      return
    }

    try {
      settings = JSON.parse(settingsJSON)
    } catch (e) {
      log('malformed settings in %s, regenerating'.red, settingsFilename)
      generateSettings()
    }

    readTries += 1
  }

  settings.affiliateCode = code

  try {
    fs.writeFileSync(settingsFilename, JSON.stringify(settings))
  } catch (e) {
    log('failed to write settings file: %s'.red, e.message)
  }

  log('Done!'.green)
}
