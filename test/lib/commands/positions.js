/* eslint-env mocha */
'use strict'

const script = require('bitfinex-api-node/examples/rest2/positions')
const positions = require('../../../lib/commands/positions')
const validateCommand = require('../../util/validate_command')

script.skipAutoExec()

describe('positions', () => {
  validateCommand(positions, script)
})
