// Functions
const runQuery = require("../functions/runQuery");
const displayResult = require("../functions/displayResult");

// Query
const { countUniqueNodesQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "7",
  aliases: ["count-unique"],
  describe: "Counts how many uniquely named nodes there are.",
  // FUNCTION
  handler: async (argv) => {
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

    // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
    process.exit();
  },
};

module.exports = command;
