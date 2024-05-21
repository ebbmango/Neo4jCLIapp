// libraries
const neo4j = require("neo4j-driver");

// Functions
const runQuery = require("../functions/runQuery");
const runQueryWithSpinner = require("../functions/runQueryWithSpinner");
const logsFullArray = require("../functions/logsFullArray");

// Queries
const { findInfertileNodesQuery: query } = require("../queries/cypherQueries");
const displayResult = require("../functions/displayResult");

const command = {
  command: "10",
  aliases: ["find-infertile"],
  describe:
    "Finds the nodes with the least children (there could be more than one).",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    // Runs the query.
    const { queryResult, executionTime } = await runQueryWithSpinner({
      query,
      queryParameters: {},
      loadingText: "Finding all nodes with the least children",
      successText: "Query completed."
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
  },
};

module.exports = command;
