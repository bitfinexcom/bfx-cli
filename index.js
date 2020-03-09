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

const commands = require('./lib/commands')
const loadConfig = require('./lib/load_config')
const manifest = require('./package.json')

updateNotifier({ pkg: manifest }).notify()

const run = async () => {
  let commandRequiresAuth = false // cannot use argv below due to async

  const argv = yArgs
    .scriptName('bfx-cli')
    .usage('Usage: bfx-cli [command] <options>')
    .demandCommand(1, 'A command is required')
    .middleware((argv) => {
      const { _ } = argv
      const suppliedCommand = _[0]

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
      if (!commandRequiresAuth) {
        return
      }

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
