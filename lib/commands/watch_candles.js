'use strict'

const script = require('bitfinex-api-node/examples/ws2/candles')
const { TIME_FRAMES } = require('bfx-hf-util')

const cmdHandler = require('../cmd_handler')
const marketParam = require('../params/market')
const tfParam = require('../params/tf')

script.skipAutoExec()

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
  },
  handler: cmdHandler((args) => {
    const { market, tf } = args
    const scriptArgs = {
      market: marketParam('market', market),
      tf: tfParam('time frame', tf)
    }

    return script.exec(scriptArgs)
  })
}
