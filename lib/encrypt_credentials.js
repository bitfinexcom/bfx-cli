'use strict'

const AES = require('aes-js')
const genAESKey = require('./gen_aes_key')

module.exports = async ({ password, key, secret }) => {
  const aesKey = await genAESKey(password)
  const { fromBytes } = AES.utils.hex
  const { toBytes } = AES.utils.utf8

  const aesCTR = new AES.ModeOfOperation.ctr(aesKey) // eslint-disable-line
  const keyBytes = toBytes(key)
  const secretBytes = toBytes(secret)
  const controlBytes = toBytes('control')

  const keyCipherText = fromBytes(aesCTR.encrypt(keyBytes))
  const secretCipherText = fromBytes(aesCTR.encrypt(secretBytes))
  const controlCipherText = fromBytes(aesCTR.encrypt(controlBytes))

  return {
    key: keyCipherText,
    secret: secretCipherText,
    control: controlCipherText
  }
}
