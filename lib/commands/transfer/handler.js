'use strict'

const script = require('bitfinex-api-node/examples/rest2/transfer')
const walletTypeParam = require('../../params/wallet_type')
const currencyParam = require('../../params/currency')
const amountParam = require('../../params/amount')

script.skipAutoExec()

/**
  * Executes a wallet transfer
  *
  * @param {Object} argv - from yargs
  * @return {Promise} p - resolves on script end
  */
module.exports = (argv) => {
  const { q, ccy, src, dest } = argv
  const scriptArgs = {
    amount: amountParam('amount', +q)
  }

  const ccyParsed = currencyParam('currency', ccy)
  const sourceParsed = walletTypeParam('source wallet', src)
  const destinationParsed = walletTypeParam('destination wallet', dest)

  scriptArgs.fromType = sourceParsed
  scriptArgs.fromCCY = ccyParsed
  scriptArgs.toType = destinationParsed
  scriptArgs.toCCY = ccyParsed

  return script.exec(scriptArgs)
}
