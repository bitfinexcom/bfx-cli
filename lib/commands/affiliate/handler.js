'use strict'

const fs = require('fs')
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
      console.error('failed to read settings file: %s', e.message)
      return
    }

    try {
      settings = JSON.parse(settingsJSON)
    } catch (e) {
      console.error('malformed settings in %s, regenerating', settingsFilename)
      generateSettings()
    }

    readTries += 1
  }

  settings.affiliateCode = code

  try {
    fs.writeFileSync(settingsFilename, JSON.stringify(settings))
  } catch (e) {
    console.error('failed to write settings file: %s', e.message)
  }

  console.log('Done!')
}
