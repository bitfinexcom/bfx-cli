'use strict'

const { VERBOSE_ERRORS } = process.env

/**
 * Returns the full error stack if `VERBOSE_ERRORS` (env var) is truth-ey,
 * otherwise the error message. The variable is loaded at startup via `dotenv`
 *
 * @memberof module:utilities
 * @param {Error} e - error
 * @returns {string} str - message or stack
 */
const wrapError = e => (
  VERBOSE_ERRORS ? e.stack : e.message
)

module.exports = wrapError
