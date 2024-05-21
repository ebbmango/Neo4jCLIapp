// Functions
const displayResult = require("../functions/displayResult");
const runQuery = require("../functions/runQuery");

// Query
const { countUniqueNodesQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "7",
  aliases: ["count-unique"],
  describe: "Counts how many uniquely named nodes there are.",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    // Runs the query.
    const { queryResult, executionTime } = await runQuery(query);

    // Reads the result
    const uniqueCount = queryResult.records[0].get("uniqueCount");

    // Displays the result.
    await displayResult({
      executionTime,
      header: `The amount of <bold>uniquely named nodes</bold> is:`,
      data: `<ylw>${uniqueCount}</ylw>`,
    });
  },
};

module.exports = command;
