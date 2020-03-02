'use strict'

const _isEmpty = require('lodash/isEmpty')
const { TIME_FRAMES } = require('bfx-hf-util')
const stringParam = require('./string')

const TIME_FRAME_LIST = Object.values(TIME_FRAMES)

module.exports = (name, v, allowEmpty) => {
  stringParam(name, v, allowEmpty)

  if (_isEmpty(v)) {
    if (allowEmpty) {
      return v
    }

    throw new Error(`${name} must be provided`)
  }

  if (TIME_FRAME_LIST.indexOf(v) === -1) {
    throw new Error(`unknown time frame: ${v}`)
  }

  return v
}
