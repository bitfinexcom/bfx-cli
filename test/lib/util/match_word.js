/* eslint-env mocha */
'use strict'

const assert = require('assert')
const f = require('../../../lib/util/match_word')

describe('matchWord', () => {
  it('returns no results if provided an empty source', () => {
    assert.deepStrictEqual(f('', ['test']), [])
  })

  it('returns no results if provided an empty targets array', () => {
    assert.deepStrictEqual(f('test', []), [])
  })

  it('returns valid matches regardless of case', () => {
    assert.deepStrictEqual(f('test-string', ['string']), ['string'])
    assert.deepStrictEqual(f('test-STRING', ['string']), ['string'])
    assert.deepStrictEqual(f('test-stRING', ['string']), ['string'])
    assert.deepStrictEqual(f('test-str', ['string']), ['string'])
    assert.deepStrictEqual(f('test-STR', ['string']), ['string'])
    assert.deepStrictEqual(f('str-test', ['string']), ['string'])
    assert.deepStrictEqual(f('STR-test', ['string']), ['string'])
  })

  it('matches values containing spaces', () => {
    assert.deepStrictEqual(f('stop limit', ['stop', 'limit']), ['stop', 'limit'])
  })
})
