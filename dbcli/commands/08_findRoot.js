// libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");

const command = {
  command: "8",
  describe:
    "Finds a root node (i.e., one which is not a subcategory of any other node).",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await validateArguments(arguments, 0);
    await validateConnection();

    console.log("Task 08 - Work in progress");
  },
};

module.exports = command;
