/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/ws2/order_book_viz')
const watchOrderBook = require('../../../lib/commands/watch_order_book')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('watch order book', async () => {
  await validateCommand(watchOrderBook, script, [{
    label: 'passes market param',
    scriptArgs: { market: 'tLEOUSD' },
    handlerArgs: { market: 'leo-usd' }
  }])
})
