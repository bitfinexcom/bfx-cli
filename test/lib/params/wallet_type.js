/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { WALLET_TYPES } = require('bfx-hf-util')
const walletParam = require('../../../lib/params/wallet_type')

describe('wallet param validator', () => {
  it('throws an error if not a string', () => {
    assert.throws(() => walletParam('test', null))
    assert.throws(() => walletParam('test', undefined))
    assert.throws(() => walletParam('test', {}))
    assert.throws(() => walletParam('test', []))
    assert.throws(() => walletParam('test', () => {}))
    assert.throws(() => walletParam('test', 0))
  })

  it('passes validation for valid wallet types', () => {
    WALLET_TYPES.forEach(t => {
      assert.doesNotThrow(() => walletParam('test', t))
    })
  })

  it('fails validation for invalid wallet types', () => {
    WALLET_TYPES.forEach(t => {
      assert.throws(() => walletParam('test', `_${t}`))
    })
  })
})
