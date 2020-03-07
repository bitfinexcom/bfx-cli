'use strict'

const _isEmpty = require('lodash/isEmpty')
const Promise = require('bluebird')
const scrypt = require('scrypt-js')
const buffer = require('scrypt-js/thirdparty/buffer')

module.exports = (password, salt) => {
  if (_isEmpty(salt)) {
    throw new Error('salt required')
  }

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
