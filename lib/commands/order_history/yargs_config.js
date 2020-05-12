'use strict'

/**
  * Order history command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'order-history <market>',
  describe: 'Fetch order history',
  builder: {
    market: {
      alias: 'm',
      description: 'Market to fetch history for'
    }
  }
}
