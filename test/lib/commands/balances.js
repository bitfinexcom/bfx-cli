/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/balances')
const balances = require('../../../lib/commands/balances')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('balances', () => {
  validateCommand(balances, script, [{
    label: 'passes zero flag',
    scriptArgs: { hideZeroBalances: false },
    handlerArgs: { zero: true }
  }, {
    label: 'defaults to hiding zero balances',
    scriptArgs: { hideZeroBalances: true },
    handlerArgs: {}
  }, {
    label: 'passes currency filter',
    scriptArgs: { filterByCurrency: 'USD', hideZeroBalances: true },
    handlerArgs: { currency: 'USD' }
  }, {
    label: 'passes type filter',
    scriptArgs: { filterByType: 'exchange', hideZeroBalances: true },
    handlerArgs: { type: 'exchange' }
  }])
})
