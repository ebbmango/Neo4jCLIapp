// Functions
const runQuery = require("../functions/runQuery");
const chalkText = require("../functions/chalkText");
const displayResult = require("../functions/displayResult");

// Query
const { renameQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "11 <node_name> <new_name>",
  aliases: ["rename"],
  describe: "Renames a given node.",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    // Creates handlers for the relevant arguments.
    const nodeName = argv["node_name"];
    const newName = argv["new_name"];

    try {
      // Runs the query.
      const { queryResult, executionTime } = await runQuery(query, {
        categoryName: nodeName,
        newName,
      });

      // Reads the result
      const renamedNode = queryResult.records[0].get("node").properties.name;

      // If the node has been renamed...
      if (renamedNode === newName) {
        // Display the query's result to the user.
        displayResult({
          executionTime,
          header: `<grn>✔</grn> Successfuly renamed the node <ylw>${nodeName}</ylw> to <ylw>${newName}</ylw>`,
        });
      } else {
        throw new Error("Failed to rename the node.");
      }
    } catch (error) {
      // If it hasn't, log the failure to the user.
      const xMark = chalk.red("✖");
      console.log(
        await chalkText(
          `<red>✖</red> Failed to rename the node <ylw>${nodeName}</ylw> to <ylw>${newName}</ylw>`
        )
      ); // Handles errors.
      console.log(
        await chalkText(
          `<mgnt>TIP:</mgnt> Make sure the node called <ylw>${nodeName}</ylw> truly exists.`
        )
      );
    }

    // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
    process.exit();
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe: "Name of the node whose name you would like to change.",
        type: "string",
      })
      .positional("<new_name>", {
        describe: "Name to which you would like to change the node's name.",
        type: "string",
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
