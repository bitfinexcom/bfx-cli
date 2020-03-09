'use strict'

/**
  * Watch trades command yargs config
  *
  * @type {Object}
  */
module.exports = {
  command: 'watch-trades <market>',
  describe: 'Monitor a trade feed',
  builder: {
    market: {
      alias: 'm',
      description: 'Watch by market'
    }
  }
}
