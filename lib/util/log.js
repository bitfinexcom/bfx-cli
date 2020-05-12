'use strict'

require('colors')

const _isError = require('lodash/isError')
const { sprintf } = require('sprintf-js')
const wrapError = require('./wrap_error')

/**
 * Utility to render errors as traces if the env flag VERBOSE_ERRORS is truthy
 * (see {@link module:utilities.wrapError} and pass all data along to
 * `sprintf`, allowing for template strings.
 *
 * A green '> ' is added to the start of each line.
 *
 * If called with no arguments a newline is logged.
 *
 * @memberof module:utilities
 * @param {...*} data - data
 */
const log = (...data) => {
  if (data.length === 0) {
    console.log('')
    return
  }

  console.log('> '.green, sprintf(...data.filter(d => (
    _isError(d) ? wrapError(d) : d
  ))))
}

module.exports = log
