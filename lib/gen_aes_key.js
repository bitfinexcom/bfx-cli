'use strict'

const Promise = require('bluebird')
const scrypt = require('scrypt-js')
const buffer = require('scrypt-js/thirdparty/buffer')
const salt = require('./load_salt')

/**
  * Generate an AES key suitable for the encrypt/decrypt methods
  *
  * @param {string} password
  * @return {Promise} p - resolves to key
  */
module.exports = (password) => {
  const pwBuff = new buffer.SlowBuffer(password.normalize('NFKC'))
  const saltBuff = new buffer.SlowBuffer(salt.normalize('NFKC'))

  return new Promise((resolve, reject) => {
    scrypt(pwBuff, saltBuff, 1024, 8, 1, 32, (error, _, key) => {
      if (error) {
        return reject(new Error(error))
      }

      if (!key) {
        return
      }

      resolve(key)
    })
  })
}
