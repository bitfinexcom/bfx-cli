'use strict'

const _isEmpty = require('lodash/isEmpty')
const script = require('bitfinex-api-node/examples/rest2/balances')
const cmdHandler = require('../cmd_handler')
const walletTypeParam = require('../params/wallet_type')
const currencyParam = require('../params/currency')

script.skipAutoExec()

module.exports = {
  command: 'balances',
  describe: 'Fetch and display wallet balances',
  builder: {
    type: {
      alias: 't',
      description: 'Filter by wallet type',
      choices: ['trading', 'deposit', 'exchange']
    },

    currency: {
      alias: 'c',
      description: 'Filter by currency'
    },

    zero: {
      alias: 'z',
      description: 'Show zero balances',
      type: 'boolean'
    }
  },

  handler: cmdHandler((argv) => {
    const { type, currency, zero } = argv
    const scriptArgs = {
      hideZeroBalances: !zero
    }

    if (!_isEmpty(type)) {
      scriptArgs.filterByType = walletTypeParam('wallet type', type)
    }

    if (!_isEmpty(currency)) {
      scriptArgs.filterByCurrency = currencyParam('currency', currency)
    }

    return script.exec(scriptArgs)
  })
}
