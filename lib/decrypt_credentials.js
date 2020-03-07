'use strict'

const AES = require('aes-js')
const genAESKey = require('./gen_aes_key')

module.exports = async ({ password, salt, key, secret, control }) => {
  const aesKey = await genAESKey(password, salt)
  const { fromBytes } = AES.utils.utf8
  const { toBytes } = AES.utils.hex

  const aesCTR = new AES.ModeOfOperation.ctr(aesKey) // eslint-disable-line
  const decryptedKey = fromBytes(aesCTR.decrypt(toBytes(key)))
  const decryptedSecret = fromBytes(aesCTR.decrypt(toBytes(secret)))
  const decryptedControl = fromBytes(aesCTR.decrypt(toBytes(control)))

  if (decryptedControl !== 'control') {
    throw new Error('Wrong password or malformed credentials')
  }

  return {
    key: decryptedKey,
    secret: decryptedSecret
  }
}
