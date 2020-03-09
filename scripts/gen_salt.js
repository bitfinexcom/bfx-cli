'use strict'

const fs = require('fs')

const SALT_FN = './.salt.json'
const SALT_LENGTH = 32
const SALT_SRC = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

let saltExists = false

try {
  fs.statSync(SALT_FN)
  saltExists = true
} catch {
  saltExists = false
}

if (!saltExists) {
  let salt = ''

  for (let i = 0; i < SALT_LENGTH; i += 1) {
    salt += SALT_SRC[Math.floor(SALT_SRC.length * Math.random())]
  }

  try {
    fs.writeFileSync(SALT_FN, JSON.stringify({ salt }))
  } catch (e) {
    console.error('failed to write salt: %s', e.message)
  }
}

module.exports = SALT_FN
