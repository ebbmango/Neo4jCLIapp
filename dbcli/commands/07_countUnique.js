// Functions
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
    const queryResult = await runQuery(query);
    const uniqueCount = queryResult.records[0].get("uniqueCount");
    // Formats the result.
    const formattedCount = new Intl.NumberFormat("en", {
      minimumIntegerDigits: 3,
    }).format(uniqueCount);
    const chalkTitle = chalk.bold("uniquely named nodes");
    const chalkContent = chalk.yellow.bold(`${formattedCount}`);
    // Displays the result.
    console.log(`The amount of ${chalkTitle} is: ${chalkContent}`);
  },
};

module.exports = command;
