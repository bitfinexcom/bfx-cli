'use strict'

const _isEmpty = require('lodash/isEmpty')
const _includes = require('lodash/includes')

/**
 * Takes a source string which can be composed of multiple a-Z tokens and
 * seperators, and attempts to match it against an array of valid words.
 *
 * @param {string} source - raw source string, spaces will be trimmed
 * @param {string[]} targets - array of valid words to match against
 * @return {string[]} matches - matched words, may be empty
 */
module.exports = (source, targets = []) => {
  if (_isEmpty(source) || _isEmpty(targets)) {
    return []
  }

  // normalize seperators, and split into words
  const tokens = source
    .split('')
    .map((c) => (
      (c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90) ||
      (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 122)
    ) ? c : '.')
    .join('')
    .toLowerCase()
    .split('.')

  const matches = []
  let target
  let token

  for (let i = 0; i < targets.length; i += 1) {
    target = targets[i]

    for (let j = 0; j < tokens.length; j += 1) {
      token = tokens[j]

      if (_includes(target.toLowerCase(), token)) {
        matches.push(target)
      }
    }
  }

  return matches
}
