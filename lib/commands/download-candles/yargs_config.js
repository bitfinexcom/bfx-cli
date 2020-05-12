'use strict'

/**
  * Download command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'download-candles <market> <tf> <count>',
  describe: 'Download a candle dataset',
  builder: {
    market: {
      alias: 'm',
      description: 'Market to download data for'
    },

    tf: {
      description: 'Time frame to download data for'
    },

    count: {
      alias: 'c',
      description: 'Number of candles to download'
    },

    output: {
      alias: 'o',
      description: 'Filename to write candles to'
    }
  }
}
