// Functions
const runQuery = require("../functions/runQuery");
const displayResult = require("../functions/displayResult");

// Query
const { findGrandparentsQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "6 <node_name>",
  aliases: ["find-grandparents"],
  describe: "Finds all grandparents of a given node.",
  // FUNCTION
  handler: async (argv) => {
    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const { queryResult, executionTime } = await runQuery(query, {
      categoryName: nodeName,
    });

    // Reads the query
    const grandparents = queryResult.records.map(
      (record) => record.get("grandparent").properties.name
    );

    // Displays the result
    await displayResult({
      executionTime,
      header: `All grandparents of the node "<bold>${nodeName}</bold>":`,
      data: grandparents,
    });
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe: "Name of the node whose grandparents you would like to find.",
        type: "string",
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
