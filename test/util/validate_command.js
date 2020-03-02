/* eslint-env mocha */
'use strict'

const sinon = require('sinon')
const assert = require('assert')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _isObject = require('lodash/isObject')
const _isFunction = require('lodash/isFunction')

module.exports = (cmd, script, argTests = []) => {
  it.skip('provides a valid command module', () => {
    assert.ok(_isString(cmd.command) && !_isEmpty(cmd.command), 'command name required')
    assert.ok(_isString(cmd.describe) && !_isEmpty(cmd.describe), 'command description required')
    if (cmd.builder) assert.ok(_isObject(cmd.builder), 'command builder not an object')
    assert.ok(_isFunction(cmd.handler), 'command handler required')
  })

  argTests.forEach(test => {
    it.skip(test.label, () => {
      const s = sinon
        .mock(script)
        .expects('example')
        .withExactArgs(test.scriptArgs)

      cmd.handler(test.handlerArgs)

      s.verify()
      script.exec.restore()
    })
  })
}
