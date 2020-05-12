/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/ws2/trades')
const watchTrades = require('../../../lib/commands/watch_trades')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('watch trades', async () => {
  await validateCommand(watchTrades, script, [{
    label: 'passes market param',
    scriptArgs: { market: 'tLEOUSD' },
    handlerArgs: { market: 'leo-usd' }
  }])
})
