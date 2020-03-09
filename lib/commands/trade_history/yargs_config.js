'use strict'

/**
  * Trade history command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'trade-history <market>',
  describe: 'Fetch trade history',
  builder: {
    market: {
      alias: 'm',
      description: 'Market to fetch history for'
    }
  }
}
