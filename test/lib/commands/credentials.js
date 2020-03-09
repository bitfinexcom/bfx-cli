/* eslint-env mocha */
'use strict'

const credentials = require('../../../lib/commands/credentials')
const validateCommand = require('../../util/validate_command')

describe('credentials', () => {
  validateCommand(credentials)
})
