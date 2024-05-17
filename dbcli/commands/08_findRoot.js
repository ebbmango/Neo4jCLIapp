// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

const command = {
  command: "8",
  describe:
    "Finds a root node (i.e., one which is not a subcategory of any other node).",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await checkArguments(arguments, 0);
    await checkConnection();

    console.log("Task 08 - Work in progress");
  },
};

module.exports = command;
