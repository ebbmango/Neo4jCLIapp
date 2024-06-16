// Functions
const runQuery = require("../functions/runQuery");
const displayResult = require("../functions/displayResult");

// Query
const { countParentsQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "5 <node_name>",
  aliases: ["count-parents"],
  describe: "Counts all parents of a given node.",
  // FUNCTION
  handler: async (argv) => {
    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const { queryResult, executionTime } = await runQuery(query, {
      categoryName: nodeName,
    });

    // Reads the query.
    const parentsCount = queryResult.records[0].get("parentsCount");

    // Displays the result.
    await displayResult({
      executionTime,
      header: `The amount of parents of the node "<bold>${nodeName}</bold>" is:`,
      data: `<ylw>${parentsCount}</ylw>`,
    });

    // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
    process.exit();
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe: "Name of the node whose parents you would like to count.",
        type: "string",
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
