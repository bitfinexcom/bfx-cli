/* eslint-env mocha */
'use strict'

const assert = require('assert')
const _isArray = require('lodash/isArray')
const commands = require('../../../lib/commands')
const validateCommand = require('../../util/validate_command')

describe('all commands', () => {
  it('are provided in an array', () => {
    assert.ok(_isArray(commands), 'commands not an array')
  })

  it('are valid', () => {
    commands.forEach(cmd => validateCommand(cmd))
  })
})
