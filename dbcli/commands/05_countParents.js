// Functions
const runQuery = require("../functions/runQuery");

// Query
const { countParentsQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "5 <node_name>",
  aliases: ["count-parents"],
  describe: "Counts all parents of a given node.",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const queryResult = await runQuery(query, { categoryName: nodeName });
    // Reads the query.
    const parentsCount = queryResult.records[0].get("parentsCount");
    // Formats the result.
    const chalkTitle = chalk.bold(`"${nodeName}"`);
    const chalkResult = chalk.yellow.bold(`${parentsCount}`);
    // Displays the result.
    console.log(
      `The amount of parents of the node ${chalkTitle} is: ${chalkResult}`
    );
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
