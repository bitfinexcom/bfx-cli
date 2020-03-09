/* eslint-env mocha */
/* eslint-env mocha */
'use strict'

const currencies = require('../../../lib/commands/currencies')
const validateCommand = require('../../util/validate_command')

describe('currencies', () => {
  validateCommand(currencies)
})
