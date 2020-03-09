'use strict'

const { TIME_FRAMES } = require('bfx-hf-util')

/**
  * Watch candles command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'watch-candles <market> <tf>',
  describe: 'Monitor a candle feed',
  builder: {
    market: {
      alias: 'm',
      description: 'Market to watch'
    },

    tf: {
      description: 'Time frame',
      options: Object.values(TIME_FRAMES)
    }
  }
}
