// Functions
const runQuery = require("../functions/runQuery");
const displayResult = require("../functions/displayResult");

// Query
const { findGrandchildrenQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "3 <node_name>",
  aliases: ["find-grandchildren"],
  describe: "Finds all grandchildren of a given node.",
  // FUNCTION
  handler: async (argv) => {
    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const { queryResult, executionTime } = await runQuery(query, {
      categoryName: nodeName,
    });

    // Reads the query.
    const grandchildren = queryResult.records.map(
      (record) => record.get("grandchild").properties.name
    );

    // Displays the result
    await displayResult({
      executionTime,
      header: `All grandchildren of the node "<bold>${nodeName}</bold>":\n`,
      data: grandchildren,
    });

    // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
    process.exit();
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe:
          "Name of the node whose grandchildren you would like to find.",
        type: "string",
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
