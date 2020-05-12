/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/order-history')
const orderHistory = require('../../../lib/commands/order_history')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('order history', () => {
  validateCommand(orderHistory, script, [{
    label: 'passes market',
    scriptArgs: { market: 'tBTCUSD' },
    handlerArgs: { market: 'tBTCUSD' }
  }])
})
