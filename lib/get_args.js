'use strict'

const yArgs = require('yargs')
const commands = require('./commands')

/**
 * Retrieve CLI args using the command definitions
 *
 * @return {Object} argv
 */
module.exports = () => {
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
