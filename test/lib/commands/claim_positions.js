/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/claim_positions')
const claimPositions = require('../../../lib/commands/claim_positions')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('claim positions', () => {
  validateCommand(claimPositions, script, [{
    label: 'passes market',
    scriptArgs: { filterByMarket: 'tBTCUSD' },
    handlerArgs: { market: 'tBTCUSD' }
  }])
})
