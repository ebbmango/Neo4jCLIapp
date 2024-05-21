// Functions
const runQuery = require("../functions/runQuery");
const logsFullArray = require("../functions/logsFullArray");

// Query
const { findParentsQuery: query } = require("../queries/cypherQueries");
const displayResult = require("../functions/displayResult");

const command = {
  command: "4 <node_name>",
  aliases: ["find-parents"],
  describe: "Finds all parents of a given node.",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const { queryResult, executionTime } = await runQuery(query, {
      categoryName: nodeName,
    });
    const parents = queryResult.records.map(
      (record) => record.get("parent").properties.name
    );

    // Displays the result
    await displayResult({
      executionTime,
      header: `All parents of the node "<bold>${nodeName}</bold>":`,
      data: parents,
    });
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe: "Name of the node whose parents you would like to find.",
        type: "string",
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
