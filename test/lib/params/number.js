/* eslint-env mocha */
'use strict'

const assert = require('assert')
const numberParam = require('../../../lib/params/number')

describe('number param validator', () => {
  it('throws an error if not a number', () => {
    assert.throws(() => numberParam('test', null))
    assert.throws(() => numberParam('test', undefined))
    assert.throws(() => numberParam('test', {}))
    assert.throws(() => numberParam('test', []))
    assert.throws(() => numberParam('test', () => {}))
    assert.throws(() => numberParam('test', ''))
  })

  it('includes name in the error message', () => {
    try {
      numberParam('whatwhat', '')
      assert.fail('string passed')
    } catch (e) {
      assert.ok(/whatwhat/.test(e.message), 'name not in error message')
    }
  })

  it('returns the unmodified number if valid', () => {
    assert.strictEqual(42, numberParam('test', 42), 'value was modified')
  })

  it('allows empty value if requested', () => {
    assert.doesNotThrow(() => numberParam('test', '', true))
    assert.doesNotThrow(() => numberParam('test', null, true))
  })
})
