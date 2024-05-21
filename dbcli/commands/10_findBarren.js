// Functions
const runQueryWithSpinner = require("../functions/runQueryWithSpinner");
const displayResult = require("../functions/displayResult");

// Queries
const { findInfertileNodesQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "10",
  aliases: ["find-infertile"],
  describe:
    "Finds the nodes with the least children (there could be more than one).",
  // FUNCTION
  handler: async (argv) => {
    // Runs the query.
    const { queryResult, executionTime } = await runQueryWithSpinner({
      query,
      queryParameters: {},
      loadingText: "Finding all nodes with the least children",
      successText: "Query completed.",
    });

    // Reads the query.
    const infertileNodes = queryResult.records.map(
      (record) => record.get("node").properties.name
    );

    // Displays the result
    await displayResult({
      executionTime,
      header: `Nodes with <bold>the highest amount of children</bold>:`,
      data: infertileNodes,
    });

    process.exit();
  },
};

module.exports = command;
