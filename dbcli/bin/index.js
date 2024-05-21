#!/usr/bin/env node
(async () => {
  const { default: chalk } = await import("chalk");
  const yargs = require("yargs");

  // db setup
  const load = require("../commands/00_load.js");
  const connect = require("../commands/00_connect.js");

  // tasks
  const commands = require("../commands/indexCommands.js");
  const test = require("../commands/13_test.js");

  // yargs
  const checkConnection = require("../yargs/checkConnection");
  const throwError = require("../yargs/throwError");
  const displayError = require("../yargs/displayError");

  try {
    await yargs
      // setup
      .command(load)
      .command(connect)
      // tasks
      .command(commands.findAllChildren)
      .command(commands.countChildren)
      .command(commands.findGrandchildren)
      .command(commands.findParents)
      .command(commands.countParents)
      .command(commands.findGrandparents)
      .command(commands.countUnique)
      .command(commands.findRoot)
      .command(commands.findBarren)
      .command(commands.findFertile)
      .command(commands.renameNode)
      .command(commands.findPaths)
      .command(test)
      .help() // enables "--help" command
      .version(false) // disables "--version" command
      .check(checkConnection)
      .fail(throwError).argv; // throws internal errors to the catch block
  } catch (error) {
    displayError(error); // Formats and displays the error message
  }
})();
