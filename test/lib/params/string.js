/* eslint-env mocha */
'use strict'

const assert = require('assert')
const stringParam = require('../../../lib/params/string')

describe('string param validator', () => {
  it('throws an error if not a string', () => {
    assert.throws(() => stringParam('test', null))
    assert.throws(() => stringParam('test', undefined))
    assert.throws(() => stringParam('test', {}))
    assert.throws(() => stringParam('test', []))
    assert.throws(() => stringParam('test', () => {}))
    assert.throws(() => stringParam('test', 0))
  })

  it('includes name in the error message', () => {
    try {
      stringParam('whatwhat', 42)
      assert.fail('number passed')
    } catch (e) {
      assert.ok(/whatwhat/.test(e.message), 'name not in error message')
    }
  })

  it('returns the unmodified string if valid', () => {
    assert.strictEqual('value', stringParam('test', 'value'), 'value was modified')
  })

  it('allows empty value if requested', () => {
    assert.doesNotThrow(() => stringParam('test', '', true))
    assert.doesNotThrow(() => stringParam('test', null, true))
  })
})
