// libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");

const command = {
  command: ["11", "rename"],
  describe: "Renames a given node.",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await validateArguments(arguments, 2);
    await validateConnection();

    console.log("Task 11 - Work in progress");
  },
};

module.exports = command;
