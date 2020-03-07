#!/usr/bin/env node
'use strict'

if (!process.env.DEBUG) {
  process.env.DEBUG = '>'
}

require('bfx-hf-util/lib/catch_uncaught_errors')
require('./lib/override_bfx_api_node_debug')
require('pipe-args').load()

const _isEmpty = require('lodash/isEmpty')
const debug = require('debug')('>')
const yArgs = require('yargs')

const commands = require('./lib/commands')
const loadConfig = require('./lib/load_config')

const run = async () => {
  const argv = yArgs
    .scriptName('bfx-cli')
    .usage('Usage: bfx-cli [command] <options>')
    .demandCommand(1, 'A command is required')
    .middleware(async () => {
      const config = await loadConfig()
      const { key, secret } = config

      if (_isEmpty(key) || _isEmpty(secret)) {
        console.log('No API credentials set; run \'bfx-cli credentials\' to set them')
        console.log('')
        return
      }

      // setup on env for bitfinex-api-node scripts
      process.env.API_KEY = key
      process.env.API_SECRET = secret
      process.env.BFX_CLI_CREDENTIALS_LOADED = true
    })
    .help()

  commands.forEach(def => argv.command(def))

  argv.parse()
}

try {
  run()
} catch (e) {
  debug('%s', e.message)
}
