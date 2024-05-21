// Functions
const runQueryWithSpinner = require("../functions/runQueryWithSpinner");
const displayResult = require("../functions/displayResult");

// Query
const { findFertileNodesQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "9",
  aliases: ["find-fertile"],
  describe:
    "Finds the nodes with the most children (there could be more than one).",
  // FUNCTION
  handler: async (argv) => {
    // Runs the query.
    const { queryResult, executionTime } = await runQueryWithSpinner({
      query,
      queryParameters: {},
      loadingText: "Finding all nodes with the most children",
      successText: "Query completed.",
    });

    // Reads the query.
    const fertileNodes = queryResult.records.map(
      (record) => record.get("node").properties.name
    );

    // Displays the result
    await displayResult({
      executionTime,
      header: `\nNodes with <bold>the highest amount of children</bold>:\n`,
      data: fertileNodes,
    });

    // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
    process.exit();
  },
};

module.exports = command;
