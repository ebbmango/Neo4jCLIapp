// Functions
const runQuery = require("../functions/runQuery")
const logsFullArray = require("../functions/logsFullArray");

// Query
const { findGrandchildrenQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "3 <node_name>",
  aliases: ["find-grandchildren"],
  describe: "Finds all grandchildren of a given node.",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const queryResult = await runQuery(query, { categoryName: nodeName });

    // Reads the query.
    const grandchildren = queryResult.records.map(
      (record) => record.get("grandchild").properties.name
    );

    // Formats the result.
    const chalkTitle = chalk.bold(`"${nodeName}"`);

    // Displays the result.
    console.log(`All grandchildren of the node ${chalkTitle}:\n`);
    await logsFullArray(grandchildren);
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe: "Name of the node whose grandchildren you would like to find.",
        type: "string",
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};


module.exports = command;
