/* eslint-env mocha */
'use strict'

const assert = require('assert')
const encryptCredentials = require('../../lib/encrypt_credentials')
const decryptCredentials = require('../../lib/decrypt_credentials')

describe('encryption utilities', () => {
  it('can decrypt encrypted credentials', async () => {
    const ciphertext = await encryptCredentials({
      password: 'reallysecurepassword',
      key: 'some-key',
      secret: 'some-secret'
    })

    const cleartext = await decryptCredentials({
      password: 'reallysecurepassword',
      ...ciphertext
    })

    assert.strictEqual(cleartext.key, 'some-key')
    assert.strictEqual(cleartext.secret, 'some-secret')
  })
})
