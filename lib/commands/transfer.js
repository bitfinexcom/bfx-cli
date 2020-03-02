'use strict'

const script = require('bitfinex-api-node/examples/rest2/transfer')
const cmdHandler = require('../cmd_handler')
const walletTypeParam = require('../params/wallet_type')
const currencyParam = require('../params/currency')
const amountParam = require('../params/amount')

script.skipAutoExec()

module.exports = {
  command: 'transfer <q> <ccy> <s> <d>',
  describe: 'Transfer between wallets',
  builder: {
    q: {
      aliases: ['amount', 'quantity', 'a', 'qty'],
      description: 'Amount to transfer'
    },

    ccy: {
      alias: 'c',
      description: 'Source wallet currency'
    },

    src: {
      alias: 's',
      description: 'Source wallet type',
      choices: ['trading', 'deposit', 'exchange']
    },

    dest: {
      alias: 'd',
      description: 'Destination wallet type',
      choices: ['trading', 'deposit', 'exchange']
    }
  },

  handler: cmdHandler((argv) => {
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
  })
}
