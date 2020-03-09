/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/trade-history')
const tradeHistory = require('../../../lib/commands/trade_history')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('trade history', async () => {
  await validateCommand(tradeHistory, script, [{
    label: 'passes market param',
    scriptArgs: { symbol: 'tLEOUSD' },
    handlerArgs: { market: 'leo-usd' }
  }])
})
