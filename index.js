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
const updateNotifier = require('update-notifier')

const log = require('./lib/util/log')
const commands = require('./lib/commands')
const loadConfig = require('./lib/load_config')
const manifest = require('./package.json')

updateNotifier({ pkg: manifest }).notify()

const run = async () => {
  let commandRequiresAuth = false // cannot use argv below due to async
  let piped = false

  const argv = yArgs
    .scriptName('bfx-cli')
    .usage('Usage: bfx-cli [command] <options>')
    .demandCommand(1, 'A command is required')
    .middleware((argv) => {
      const { _ } = argv
      const suppliedCommand = _[0]

      if (_.length === 2) {
        try {
          JSON.parse(_[1])
          log('pipe detected, credentials must be on env!'.yellow)
          piped = true
          return
        } catch {} // eslint-disable-line
      }

      if (!suppliedCommand) {
        return
      }

      const command = commands.find(c => c._id === suppliedCommand)

      if (!command) {
        return // handled by yargs for us
      }

      const { _auth } = command
      commandRequiresAuth = _auth
    })
    .middleware(async () => {
      if (!commandRequiresAuth || piped) {
        return
      }

      const config = await loadConfig()
      const { key, secret } = config

      if (_isEmpty(key) || _isEmpty(secret)) {
        log([
          'No API credentials set;'.red,
          'run \'bfx-cli credentials\' to set them\n'.cyan
        ].join(' '))

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
  log('%s'.red, e.message)
}
