// Functions
const runQuery = require("../functions/runQuery");
const displayResult = require("../functions/displayResult");

// Query
const { countChildrenQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "2 <node_name>",
  aliases: ["count-children"],
  describe: "Counts all children of a given node.",
  // FUNCTION
  handler: async (argv) => {
    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const { queryResult, executionTime } = await runQuery(query, {
      categoryName: nodeName,
    });

    // Reads the query
    const childrenCount = queryResult.records[0].get("childrenCount");

    // Displays the result.
    await displayResult({
      executionTime,
      header: `The amount of children of the node "<bold>${nodeName}</bold>" is:`,
      data: `<ylw>${childrenCount}</ylw>`,
    });
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe: "Name of the node whose children you would like to count.",
        type: "string",
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
