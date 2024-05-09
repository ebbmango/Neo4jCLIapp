const fs = require("fs");

const command = {
  command: "load",
  describe:
    "Creates the database and loads it with the data provided by the CSV file passed as its argument.",
  // flags
  builder: (yargs) => {
    return yargs.option("path", {
      alias: "p",
      describe:
        "Searches for the CSV file in the location given by the informed path (as opposed to in the default import directory)",
      type: "boolean",
      default: false,
    });
  },
  // behavior
  handler: (argv) => {
    // stowing only the arguments (command name excluded) in an array
    const arguments = argv._.slice(1);

    // making sure that the user has provided a pathname
    if (arguments.length === 0) {
      console.error("Error: You must provide the pathname of the CSV file.");
      return;
    }

    // adequately formatting the path to the file depending on the user's use of flags
    const path = argv.path ? arguments[0] : `../import/${arguments[0]}`;
  },
};

module.exports = command;
