// Functions
const runQuery = require("../functions/runQuery")

// Query
const { countChildrenQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "2 <node_name>",
  aliases: ["count-children"],
  describe: "Counts all children of a given node.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const nodeName = argv["node_name"]; // Creates a handler for the relevant argument.

    // Runs the query.
    const queryResult = await runQuery(query, { categoryName: nodeName });
    // Reads the query
    const childrenCount = queryResult.records[0].get("childrenCount");
    // Formats the result.
    const chalkTitle = chalk.bold(`"${nodeName}"`);
    const chalkResult = chalk.yellow.bold(`${childrenCount}`);
    // Displays the result.
    console.log(
      `The amount of children of the node ${chalkTitle} is: ${chalkResult}`
    );
  },
};

module.exports = command;
