/* eslint-env mocha */
'use strict'

const assert = require('assert')
const cmdHandler = require('../../lib/cmd_handler')

describe('cmd handler wrapper', () => {
  it('returns a handler that catches any errors', async () => {
    const handler = cmdHandler(() => { throw new Error('test') })
    await handler()
  })
})
