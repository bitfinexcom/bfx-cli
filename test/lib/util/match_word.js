/* eslint-env mocha */
'use strict'

const assert = require('assert')
const f = require('../../../lib/util/match_word')

describe('matchVariadic', () => {
  it('returns null if provided an empty source', () => {
    assert.strictEqual(f('', ['test']), null, 'returned non-null match with no source')
  })

  it('returns null if provided an empty targets array', () => {
    assert.strictEqual(f('test', []), null, 'returned non-null match with no targets')
  })

  it('returns valid matches regardless of case', () => {
    assert.strictEqual(f('test-string', ['string']), 'string', 'did not match target')
    assert.strictEqual(f('test-STRING', ['string']), 'string', 'did not match target')
    assert.strictEqual(f('test-stRING', ['string']), 'string', 'did not match target')
    assert.strictEqual(f('test-str', ['string']), 'string', 'did not match target')
    assert.strictEqual(f('test-STR', ['string']), 'string', 'did not match target')
    assert.strictEqual(f('str-test', ['string']), 'string', 'did not match target')
    assert.strictEqual(f('STR-test', ['string']), 'string', 'did not match target')
  })
})
