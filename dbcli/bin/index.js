#!/usr/bin/env node

const yargs = require("yargs");

yargs
  .command({
    command: "test",
    describe:
      "Test command used only to check whether the command line interface is running.",
    handler: (argv) => {
      console.log("Hello, world!");
    },
  })
  .help().argv;
