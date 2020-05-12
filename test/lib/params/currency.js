/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { CURRENCIES } = require('bfx-hf-util')
const currencyParam = require('../../../lib/params/currency')

const CURRENCY_LIST = Object.values(CURRENCIES)

describe('currency param validator', () => {
  it('throws an error if not a string', () => {
    assert.throws(() => currencyParam('test', null))
    assert.throws(() => currencyParam('test', undefined))
    assert.throws(() => currencyParam('test', {}))
    assert.throws(() => currencyParam('test', []))
    assert.throws(() => currencyParam('test', () => {}))
    assert.throws(() => currencyParam('test', 0))
  })

  it('passes validation for valid currencies', () => {
    CURRENCY_LIST.forEach(ccy => {
      assert.doesNotThrow(() => currencyParam('test', ccy))
    })
  })

  it('fails validation for invalid currencies', () => {
    CURRENCY_LIST.forEach(ccy => {
      assert.throws(() => currencyParam('test', `t${ccy}`))
    })
  })
})
