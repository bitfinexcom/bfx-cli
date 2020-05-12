'use strict'

/**
  * Transfer command yargs config
  *
  * @type {Object}
  */
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
  }
}
