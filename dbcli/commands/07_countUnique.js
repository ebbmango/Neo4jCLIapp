// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

const command = {
  command: "7",
  describe: "Counts how many uniquely named nodes there are.",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await checkArguments(arguments, 0);
    await checkConnection();

    console.log("Task 07 - Work in progress");
  },
};

module.exports = command;
