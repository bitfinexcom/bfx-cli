'use strict'

const PI = require('p-iteration')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _isArray = require('lodash/isArray')
const script = require('bitfinex-api-node/examples/rest2/submit_order')

const paramsFromForm = require('./params_from_form')
const cmdHandler = require('../../cmd_handler')
const processPiped = require('./process_piped')
const yargsConfig = require('./yargs_config')

script.skipAutoExec()

module.exports = {
  ...yargsConfig,

  handler: cmdHandler(async (argv) => {
    const { _, market } = argv
    const args = _.slice(1)

    if (_isString(market) && !_isEmpty(market)) { // use supplied flags
      const params = processPiped({
        ...argv,
        symbol: market
      }, true)
      return script.exec(params)
    } else if (args.length <= 1) { // piped or no args (show form)
      let pipedArgs
      let requireConfirmation = true

      try {
        pipedArgs = JSON.parse(args[0])
        requireConfirmation = false
      } catch (e) {
        pipedArgs = await paramsFromForm()
      }

      const orders = _isArray(pipedArgs)
        ? pipedArgs.map(args => processPiped(args, requireConfirmation))
        : [processPiped(pipedArgs, requireConfirmation)]

      return PI.forEachSeries(orders, script.exec)
    }
  })
}
