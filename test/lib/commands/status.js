/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/status')
const status = require('../../../lib/commands/status')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('status', () => {
  validateCommand(status, script)
})
