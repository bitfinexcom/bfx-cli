/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/ws2/cancel_all')
const cancel = require('../../../lib/commands/cancel')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('cancel', () => {
  validateCommand(cancel, script)
})
