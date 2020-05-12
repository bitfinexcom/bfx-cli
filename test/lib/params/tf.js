/* eslint-env mocha */
'use strict'

const assert = require('assert')
const { TIME_FRAMES } = require('bfx-hf-util')
const tfParam = require('../../../lib/params/tf')

const TIME_FRAMES_LIST = Object.values(TIME_FRAMES)

describe('time frame param validator', () => {
  it('throws an error if not a string', () => {
    assert.throws(() => tfParam('test', null))
    assert.throws(() => tfParam('test', undefined))
    assert.throws(() => tfParam('test', {}))
    assert.throws(() => tfParam('test', []))
    assert.throws(() => tfParam('test', () => {}))
    assert.throws(() => tfParam('test', 0))
  })

  it('passes validation for valid time frames', () => {
    TIME_FRAMES_LIST.forEach(ccy => {
      assert.doesNotThrow(() => tfParam('test', ccy))
    })
  })

  it('fails validation for invalid time frames', () => {
    TIME_FRAMES_LIST.forEach(ccy => {
      assert.throws(() => tfParam('test', `t${ccy}`))
    })
  })
})
