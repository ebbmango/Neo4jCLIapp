// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

const command = {
  command: "4",
  describe: "Finds all parents of a given node.",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await checkArguments(arguments, 1);
    await checkConnection();

    console.log("Task 04 - Work in progress");
  },
};

module.exports = command;
