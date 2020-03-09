'use strict'

/**
  * YArgs config for balances command
  *
  * @type {Object}
  */
module.exports = {
  command: 'order',
  describe: 'Submit an order',
  help: [
    'If called with no parameters, all order params can be supplied via an',
    'interactive CLI form. Alternatively, parameters can be supplied via flags',
    'or piped in as JSON.'
  ].join(''),

  builder: {
    options: { array: true },
    market: {
      description: 'Target market for order'
    },

    price: {
      description: 'Limit price (not valid for market orders)'
    },

    amount: {
      description: 'Order amount'
    },

    type: {
      description: 'Order type'
    },

    priceStop: {
      description: 'Stop price for Stop-Limit orders'
    },

    distance: {
      description: 'Trail distance for trailing stop orders'
    }
  }
}
