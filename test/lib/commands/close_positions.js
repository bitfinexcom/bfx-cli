/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/close_positions')
const closePositions = require('../../../lib/commands/close_positions')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('close positions', () => {
  validateCommand(closePositions, script, [{
    label: 'passes market',
    scriptArgs: { filterByMarket: 'tBTCUSD' },
    handlerArgs: { market: 'tBTCUSD' }
  }])
})
