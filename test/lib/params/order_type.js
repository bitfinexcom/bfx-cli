/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { Order } = require('bfx-api-node-models')
const orderTypeParam = require('../../../lib/params/order_type')

const SEPERATORS = ['.', '-', '_']
const EXCHANGE_DECLARATIONS = ['ex', 'exchange', 'x']

describe('order type param validator', () => {
  it('throws an error if not a string', () => {
    assert.throws(() => orderTypeParam('test', null))
    assert.throws(() => orderTypeParam('test', undefined))
    assert.throws(() => orderTypeParam('test', {}))
    assert.throws(() => orderTypeParam('test', []))
    assert.throws(() => orderTypeParam('test', () => {}))
    assert.throws(() => orderTypeParam('test', 0))
  })

  it('throws an error if given an empty string and allowEmpty false', () => {
    assert.throws(() => orderTypeParam('test', ''))
  })

  it('includes name in the error message', () => {
    try {
      orderTypeParam('whatwhat', 42)
      assert.fail('number passed')
    } catch (e) {
      assert.ok(/whatwhat/.test(e.message), 'name not in error message')
    }
  })

  it('correctly detects various exchange-like declarations', () => {
    EXCHANGE_DECLARATIONS.forEach((decl) => {
      SEPERATORS.forEach((sep) => {
        orderTypeParam.TYPES.forEach((type) => {
          const src = `${decl}${sep}${type.join('-')}`
          const target = `EXCHANGE_${type.join('_')}`
          const match = orderTypeParam('test', src)

          assert.strictEqual(match, target, `did not detect EXCHANGE_${type} order`)
          assert.ok(!!Order.type[match], `unknown order type passed valiation: ${src}`)
        })
      })
    })
  })

  it('defaults to margin if no valid declarations detected', () => {
    ['any', 'thing'].forEach((trashToken) => {
      SEPERATORS.forEach((sep) => {
        orderTypeParam.TYPES.forEach((type) => {
          const src = `${trashToken}${sep}${type.join('-')}`
          const target = type.join('_')
          const match = orderTypeParam('test', src)

          assert.strictEqual(match, target, `did not detect ${type} order`)
          assert.ok(!!Order.type[match], `unknown order type passed valiation: ${src}`)
        })
      })
    })
  })
})
