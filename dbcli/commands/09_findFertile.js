// libraries
const neo4j = require("neo4j-driver");

// Functions
const runQuery = require("../functions/runQuery");
const logsFullArray = require("../functions/logsFullArray");

// Queries
const { findFertileNodesQuery: query } = require("../queries/cypherQueries");
const displayResult = require("../functions/displayResult");
const runQueryWithSpinner = require("../functions/runQueryWithSpinner");

const command = {
  command: "9",
  aliases: ["find-fertile"],
  describe:
    "Finds the nodes with the most children (there could be more than one).",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    // Runs the query.
    const { queryResult, executionTime } = await runQueryWithSpinner({
      query,
      queryParameters: {},
      loadingText: "Finding all nodes with the most children",
      successText: "Query completed."
    });

    // Reads the query.
    const fertileNodes = queryResult.records.map(
      (record) => record.get("node").properties.name
    );

    // Displays the result
    await displayResult({
      executionTime,
      header: `Nodes with <bold>the highest amount of children</bold>:`,
      data: fertileNodes,
    });
  },
};

module.exports = command;
