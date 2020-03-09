/* eslint-env mocha */
'use strict'

const marginInfo = require('../../../lib/commands/margin_info')
const validateCommand = require('../../util/validate_command')

describe('margin info', () => {
  validateCommand(marginInfo)
})
