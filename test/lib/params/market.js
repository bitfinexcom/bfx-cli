/* eslint-env mocha */
'use strict'

const assert = require('chai').assert
const marketParam = require('../../../lib/params/market')

describe('market param validator', () => {
  it('throws an error if not a string', () => {
    assert.throws(() => marketParam('test', null))
    assert.throws(() => marketParam('test', undefined))
    assert.throws(() => marketParam('test', {}))
    assert.throws(() => marketParam('test', []))
    assert.throws(() => marketParam('test', () => {}))
    assert.throws(() => marketParam('test', 0))
  })

  it('throws an error if given an empty string', () => {
    assert.throws(() => marketParam('test', ''))
  })

  it('includes name in the error message', () => {
    try {
      marketParam('whatwhat', 42)
      assert.fail('number passed validation')
    } catch (e) {
      assert.ok(/whatwhat/.test(e.message), 'name not in error message')
    }
  })

  it('does not modify if given a valid market directly', () => {
    assert.strictEqual(marketParam('test', 'tBTCUSD'), 'tBTCUSD', 'valid market was modified')
  })

  it('prefixes \'t\' if needed', () => {
    assert.strictEqual(marketParam('test', 'BTCUSD'), 'tBTCUSD', 'no \'t\' prefix added')
  })

  it('removes any seperators if needed', () => {
    const sep = ['/', '-', '_']

    sep.forEach(s => {
      assert.strictEqual(marketParam('test', `BTC${s}USD`), 'tBTCUSD', 'seperator not removed')
    })
  })

  it('converts the market to upper case if needed', () => {
    assert.strictEqual(marketParam('test', 'btcusd'), 'tBTCUSD', 'did not convert to uppercase')
    assert.strictEqual(marketParam('test', 'tbtcusd'), 'tBTCUSD', 'did not convert to uppercase')

    const sep = ['/', '-', '_']

    sep.forEach(s => {
      assert.strictEqual(marketParam('test', `btc${s}usd`), 'tBTCUSD', 'did not convert to uppercase')
    })
  })

  it('throws if given an unknown market', () => {
    assert.throws(() => marketParam('test', 'tINVALI'))
    assert.throws(() => marketParam('test', 'tINVALID'))
  })

  it('allows empty value if requested', () => {
    assert.doesNotThrow(() => marketParam('test', '', true))
    assert.doesNotThrow(() => marketParam('test', null, true))
  })
})
