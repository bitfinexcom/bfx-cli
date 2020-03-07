/* eslint-env mocha */
'use strict'

const { assert } = require('chai')
const _uniq = require('lodash/uniq')
const _filter = require('lodash/filter')
const _includes = require('lodash/includes')
const { Order } = require('bfx-api-node-models')
const paramsComplete = require('../../../../lib/commands/submit_order/params_complete')

const ORDER_TYPES = _uniq(_filter(
  Object.keys(Order.type), t => !_includes(t, ' ')
))

describe('paramsComplete', () => {
  it('requires type, symbol, and amount for all order types', () => {
    assert.throws(() => paramsComplete({
      symbol: 'tLEOUSD',
      amount: 6
    }), /type/)

    ORDER_TYPES.forEach((type) => {
      assert.throws(() => paramsComplete({
        type,
        symbol: 'tLEOUSD'
      }), /amount/)

      assert.throws(() => paramsComplete({
        type,
        amount: 6
      }), /symbol/)
    })
  })

  it('requires limit price for non-market orders', () => {
    ORDER_TYPES.filter(t => !/market/.test(t.toLowerCase())).forEach((type) => {
      assert.throws(() => paramsComplete({
        type,
        symbol: 'tLEOUSD',
        amount: 6
      }), /limit price/)
    })
  })

  it('requires stop price for stop limit orders', () => {
    assert.throws(() => paramsComplete({
      type: 'STOP LIMIT',
      price: 1,
      symbol: 'tLEOUSD',
      amount: 6
    }), /stop price/)
  })

  it('requires trail distance for trailing stop orders', () => {
    assert.throws(() => paramsComplete({
      type: 'TRAILING STOP',
      price: 1,
      symbol: 'tLEOUSD',
      amount: 6
    }), /trail distance/)
  })
})
