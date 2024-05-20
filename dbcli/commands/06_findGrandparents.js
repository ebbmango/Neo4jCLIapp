// Functions
const runQuery = require("../functions/runQuery");
const logsFullArray = require("../functions/logsFullArray");

// Query
const { findGrandparentsQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "6 <node_name>",
  aliases: ["find-grandparents"],
  describe: "Finds all grandparents of a given node.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const queryResult = await runQuery(query, { categoryName: nodeName });
    // Reads the query
    const grandparents = queryResult.records.map(
      (record) => record.get("grandparent").properties.name
    );
    // Formats the result.
    const chalkTitle = chalk.bold(`"${nodeName}"`);
    // Displays the result.
    console.log(`All grandparents of the node ${chalkTitle}:\n`);
    await logsFullArray(grandparents);
  },
};

module.exports = command;
