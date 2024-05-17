// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

const command = {
  command: "11",
  describe: "Renames a given node.",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await checkArguments(arguments, 2);
    await checkConnection();

    console.log("Task 11 - Work in progress");
  },
};

module.exports = command;
