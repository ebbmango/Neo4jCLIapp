// libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");

const command = {
  command: ["9", "find-fertile"],
  describe:
    "Finds the nodes with the most children (there could be more than one).",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await validateArguments(arguments, 0);
    await validateConnection();

    console.log("Task 09 - Work in progress");
  },
};

module.exports = command;
