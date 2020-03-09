'use strict'

const fs = require('fs')
const { settingsFilename } = require('../scripts/gen_salt')

let salt

try {
  const saltfileJSON = fs.readFileSync(`${__dirname}/../${settingsFilename}`)
  salt = JSON.parse(saltfileJSON).salt
} catch (e) {
  console.error('failed reading salt: %s', e.message)
}

module.exports = salt
