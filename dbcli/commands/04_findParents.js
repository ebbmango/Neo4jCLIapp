// Functions
const runQuery = require("../functions/runQuery");
const displayResult = require("../functions/displayResult");

// Query
const { findParentsQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "4 <node_name>",
  aliases: ["find-parents"],
  describe: "Finds all parents of a given node.",
  // FUNCTION
  handler: async (argv) => {
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

    // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
    process.exit();
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
