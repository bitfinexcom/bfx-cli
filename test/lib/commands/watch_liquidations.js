/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/ws2/liquidations')
const watchLiquidations = require('../../../lib/commands/watch_liquidations')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('watch liquidations', async () => {
  await validateCommand(watchLiquidations, script)
})
