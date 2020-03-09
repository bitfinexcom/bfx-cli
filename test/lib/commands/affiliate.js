/* eslint-env mocha */
'use strict'

const affiliate = require('../../../lib/commands/affiliate')
const validateCommand = require('../../util/validate_command')

describe('affiliate', () => {
  validateCommand(affiliate)
})
