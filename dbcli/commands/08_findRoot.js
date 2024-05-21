// Libraries
const neo4j = require("neo4j-driver");

// Functions
const runQuery = require("../functions/runQuery");
const displayResult = require("../functions/displayResult");

// Queries
const { findRandomRootQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "8",
  aliases: ["find-root"],
  describe:
    "Finds a root node (i.e., one which is not a subcategory of any other node).",
  // FUNCTION
  handler: async (argv) => {
    // Creates a handler for the relevant argument.
    const amount = argv.amount;
    console.log(amount);

    // Runs the query.
    const { queryResult, executionTime } = await runQuery(query, {
      amount: neo4j.int(amount),
    });

    // Reads the query
    const randomNodes = queryResult.records.map((record) =>
      record.get("root.name")
    );

    // Displays the result
    await displayResult({
      executionTime,
      header: `List of <ylw>${amount}</ylw> randomly selected <bold>root node(s)</bold>:`,
      data: randomNodes,
    });
  },
  // --help
  builder: (yargs) => {
    return yargs
      .option("amount", {
        describe:
          "Specifies the amount of root nodes you would like to return.",
        type: "integer",
        default: 1,
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
