'use strict'

/**
  * Download command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'download-trades <market> <to>',
  describe: 'Download a trade dataset',
  builder: {
    market: {
      alias: 'm',
      description: 'Market to download data for'
    },

    to: {
      description: 'Date until which to fetch trades, in human readable format'
    },

    output: {
      alias: 'o',
      description: 'Filename to write trades to'
    }
  }
}
