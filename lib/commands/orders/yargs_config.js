'use strict'

/**
  * Orders command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'orders [market]',
  describe: 'Fetch & display all open orders',
  builder: {
    market: {
      alias: 'm',
      description: 'Filter by market'
    }
  }
}
