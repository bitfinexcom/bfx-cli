'use strict'

const fs = require('fs')

const SETTINGS_FN = './.settings.json'
const SALT_LENGTH = 32
const SALT_SRC = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const generate = () => {
  let salt = ''
  let saltExists = false

  try {
    fs.statSync(SETTINGS_FN)
    saltExists = true
  } catch (e) { // eslint-disable-line
    saltExists = false
  }

  if (!saltExists) {
    for (let i = 0; i < SALT_LENGTH; i += 1) {
      salt += SALT_SRC[Math.floor(SALT_SRC.length * Math.random())]
    }

    try {
      fs.writeFileSync(SETTINGS_FN, JSON.stringify({
        affiliateCode: 'xZvWHMNR',
        salt
      }))
    } catch (e) {
      console.error('failed to write salt: %s', e.message)
    }
  }
}

generate()

module.exports = {
  settingsFilename: SETTINGS_FN,
  generate
}
