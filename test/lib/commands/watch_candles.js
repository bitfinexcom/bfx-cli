/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/ws2/candles')
const watchCandles = require('../../../lib/commands/watch_candles')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('watch candles', async () => {
  await validateCommand(watchCandles, script, [{
    label: 'passes market and tf params',
    scriptArgs: { market: 'tLEOUSD', tf: '1m' },
    handlerArgs: { market: 'leo-usd', tf: '1m' }
  }])
})
