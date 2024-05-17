// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

const command = {
  command: "2",
  describe: "Counts all children of a given node.",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await checkArguments(arguments, 1);
    await checkConnection();

    console.log("Task 02 - Work in progress");
  },
};

module.exports = command;
