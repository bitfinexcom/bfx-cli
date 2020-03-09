/* eslint-env mocha */
'use strict'

const { Order } = require('bfx-api-node-models')
const script = require('bitfinex-api-node/examples/rest2/submit_order')
const submitOrder = require('../../../lib/commands/submit_order')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('submit order', async () => {
  const getScriptArgs = (overrides = {}) => ({
    skipConfirm: false,
    onlySubmitOrder: true,
    symbol: 'tLEOUSD',
    price: 2,
    amount: -6,
    type: Order.type.LIMIT,
    affiliateCode: 'xZvWHMNR',
    ...overrides
  })

  const getHandlerArgs = (overrides = {}) => ({
    _: [],
    market: 'tLEOUSD',
    price: 2,
    amount: -6,
    type: Order.type.LIMIT,
    ...overrides
  })

  await validateCommand(submitOrder, script, [{
    label: 'parses, transforms market argument to valid format, and passes it',
    scriptArgs: getScriptArgs({ symbol: 'tLEOUSD' }),
    handlerArgs: getHandlerArgs({ market: 'leo-usd' })
  }, {
    label: 'parses and passes price argument',
    scriptArgs: getScriptArgs({ price: 2 }),
    handlerArgs: getHandlerArgs({ price: 2 })
  }, {
    label: 'parses and passes amount argument ',
    scriptArgs: getScriptArgs({ amount: -6 }),
    handlerArgs: getHandlerArgs({ amount: -6 })
  }, {
    label: 'parses, transforms order type argument to valid format, and passes it',
    scriptArgs: getScriptArgs({ type: 'EXCHANGE TRAILING STOP', distance: 1 }),
    handlerArgs: getHandlerArgs({ type: 'ex-trail-stop', distance: 1 })
  }, {
    label: 'passes affiliate code argument',
    scriptArgs: getScriptArgs({ affiliateCode: 'abc' }),
    handlerArgs: getHandlerArgs({ affiliateCode: 'abc' })
  }])
})
