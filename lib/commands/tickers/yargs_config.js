'use strict'

/**
  * Tickers command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'tickers [market]',
  describe: 'Fetch and display one or multiple tickers',
  builder: {
    market: {
      alias: 'm',
      description: 'Filter by market'
    }
  }
}
