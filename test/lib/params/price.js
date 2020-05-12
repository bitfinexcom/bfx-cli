/* eslint-env mocha */
'use strict'

const assert = require('assert')
const priceParam = require('../../../lib/params/price')

describe('price param validator', () => {
  it('throws an error if not a number', () => {
    assert.throws(() => priceParam('test', null))
    assert.throws(() => priceParam('test', undefined))
    assert.throws(() => priceParam('test', {}))
    assert.throws(() => priceParam('test', []))
    assert.throws(() => priceParam('test', () => {}))
    assert.throws(() => priceParam('test', ''))
  })

  it('includes name in the error message', () => {
    try {
      priceParam('whatwhat', '')
      assert.fail('string passed')
    } catch (e) {
      assert.ok(/whatwhat/.test(e.message), 'name not in error message')
    }
  })

  it('returns the unmodified price if valid', () => {
    assert.strictEqual(42, priceParam('test', 42), 'value was modified')
  })

  it('allows empty value if requested', () => {
    assert.doesNotThrow(() => priceParam('test', '', true))
    assert.doesNotThrow(() => priceParam('test', null, true))
  })

  it('throws an error if given 0 or a negative value', () => {
    assert.throws(() => priceParam('test', 0))
    assert.throws(() => priceParam('test', -1))
  })
})
