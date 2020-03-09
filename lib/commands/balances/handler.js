'use strict'

const _isEmpty = require('lodash/isEmpty')
const script = require('bitfinex-api-node/examples/rest2/balances')
const walletTypeParam = require('../../params/wallet_type')
const currencyParam = require('../../params/currency')

script.skipAutoExec()

/**
  * Fetches & lists balances optionally filtered by market/hiding wallets with
  * 0 balances.
  *
  * @param {Object} argv - from yargs
  * @return {Promise} - p - resolves on script end
  */
module.exports = (argv) => {
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
}
