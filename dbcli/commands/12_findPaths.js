// libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");

const command = {
  command: ["12", "find-paths"],
  describe:
    "Finds all paths between two given nodes, with directed edges from the first to the second node.",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await validateArguments(arguments, 2);
    await validateConnection();

    console.log("Task 12 - Work in progress");
  },
};

module.exports = command;
