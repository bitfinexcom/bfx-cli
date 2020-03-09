'use strict'

const fs = require('fs')
const SALT_FN = require('../scripts/gen_salt')

let salt

try {
  const saltfileJSON = fs.readFileSync(`${__dirname}/../${SALT_FN}`)
  salt = JSON.parse(saltfileJSON).salt
} catch (e) {
  console.error('failed reading salt: %s', e.message)
}

module.exports = salt
