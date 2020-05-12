/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/tickers')
const tickers = require('../../../lib/commands/tickers')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('tickers', async () => {
  await validateCommand(tickers, script, [{
    label: 'passes market param',
    scriptArgs: { filterByMarket: 'tLEOUSD' },
    handlerArgs: { market: 'leo-usd' }
  }])
})
