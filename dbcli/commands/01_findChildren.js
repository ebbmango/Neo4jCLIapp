// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

const command = {
  command: "1",
  describe: "Finds all children of a given node.",
  handler: async (argv) => {
    // Stows only the arguments (discards the command name) in a dedicated variable.
    const arguments = argv._.slice(1);

    // If the user provides more arguments than is expected by the command, warn them and stop the execution.
    await checkArguments(arguments, 1);

    // If a connection to the database cannot be established, inform the user and stop the execution.
    await checkConnection();

    // const driver = neo4j.driver("bolt://localhost:7687");
    // const session = driver.session();
  },
};

module.exports = command;
