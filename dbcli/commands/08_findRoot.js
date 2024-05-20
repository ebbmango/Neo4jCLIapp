// Libraries
const neo4j = require("neo4j-driver");

// Functions
const runQuery = require("../functions/runQuery");
const logsFullArray = require("../functions/logsFullArray");

// Queries
const { findRandomRootQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "8 [amount]",
  aliases: ["find-root"],
  describe:
    "Finds a root node (i.e., one which is not a subcategory of any other node).",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    // Creates a handler for the relevant argument.
    const amount = argv.amount ? argv.amount : 1;

    // Runs the query.
    const queryResult = await runQuery(query, {
      amount: neo4j.int(amount),
    });

    // Reads the query
    const randomNodes = queryResult.records.map((record) =>
      record.get("root.name")
    );

    // Formats the result.
    const chalkAmount = chalk.bold(`${amount}`);
    const chalkTitle = chalk.bold(
      `root node${randomNodes.length === 1 ? "" : "s"}`
    );

    // Displays the result.
    console.log(`List of ${chalkAmount} randomly selected ${chalkTitle}:\n`);
    await logsFullArray(randomNodes);
  },
};

module.exports = command;
