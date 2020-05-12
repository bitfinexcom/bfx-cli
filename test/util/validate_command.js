/* eslint-env mocha */
'use strict'

const sinon = require('sinon')
const assert = require('assert')
const PI = require('p-iteration')
const Promise = require('bluebird')
const _isString = require('lodash/isString')
const _isEmpty = require('lodash/isEmpty')
const _isObject = require('lodash/isObject')
const _isFunction = require('lodash/isFunction')

module.exports = async (cmd, script, argTests = []) => {
  it('provides a valid command module', () => {
    assert.ok(_isString(cmd.command) && !_isEmpty(cmd.command), 'command name required')
    assert.ok(_isString(cmd.describe) && !_isEmpty(cmd.describe), 'command description required')
    assert.ok(_isFunction(cmd.handler), 'command handler required')

    if (cmd.builder) {
      assert.ok(_isObject(cmd.builder), 'command builder not an object')
    }
  })

  return PI.forEach(argTests, async (test) => {
    await new Promise((resolve) => {
      it(test.label, async () => {
        const s = sinon.stub(script, 'exec')

        await cmd.handler(test.handlerArgs)

        assert.ok(s.getCall(0))
        assert.deepStrictEqual(s.getCall(0).args[0], test.scriptArgs)
        s.restore()
        resolve()
      })
    })
  })
}
