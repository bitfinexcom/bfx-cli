/**
  * YArgs config for balances command
  *
  * @type {Object}
  */
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
  }
}
