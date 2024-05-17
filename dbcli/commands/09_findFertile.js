// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

const command = {
  command: "9",
  describe:
    "Finds the nodes with the most children (there could be more than one).",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await checkArguments(arguments, 0);
    await checkConnection();

    console.log("Task 09 - Work in progress");
  },
};

module.exports = command;
