#! /usr/bin/env node
'use strict'

if (!process.env.DEBUG) {
  process.env.DEBUG = '>'
}

require('./lib/override_bfx_api_node_debug')

require('pipe-args').load()
const yArgs = require('yargs')
const commands = require('./lib/commands')

const argv = yArgs
  .scriptName('bfx-cli')
  .usage('Usage: bfx-cli [command] <options>')
  .demandCommand(1, 'A command is required')
  .help()

commands.forEach(def => argv.command(def))

argv.parse()
