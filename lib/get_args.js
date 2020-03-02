'use strict'

const yArgs = require('yargs')
const commands = require('./commands')

/**
 * Retrieve CLI args using our command definitions
 *
 * @param {Object?} cmdArgs - optional, passed to all command constructors
 * @return {Object} argv
 */
module.exports = (cmdArgs = {}) => {
  const argv = yArgs
    .scriptName('bfx-cli')
    .usage('Usage: bfx-cli [command] <options>')
    .option('verbose', {
      description: 'enable debug/performance logging',
      type: 'boolean',
      default: false,
      global: true
    })
    .demandCommand(1, 'A command is required')
    .help()

  commands.forEach(def => argv.command(def))

  return argv.argv
}
