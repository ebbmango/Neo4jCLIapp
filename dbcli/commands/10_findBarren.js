// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

const command = {
  command: "10",
  describe:
    "Finds the nodes with the least children (there could be more than one). Childless nodes are not considered.",
  handler: async (argv) => {
    // Validation
    const arguments = argv._.slice(1);
    await checkArguments(arguments, 0);
    await checkConnection();

    console.log("Task 10 - Work in progress");
  },
};

module.exports = command;
