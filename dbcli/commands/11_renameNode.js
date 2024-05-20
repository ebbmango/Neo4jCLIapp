// libraries
const neo4j = require("neo4j-driver");

// Functions
const runQuery = require("../functions/runQuery");

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
    
    const chalkedNodeName = chalk.yellow(`"${nodeName}"`);
    const chalkedNewName = chalk.yellow(`"${newName}"`);

    try {
      // Runs the query.
      const queryResult = await runQuery(query, { categoryName: nodeName, newName });
      const renamedNode = queryResult.records[0].get("node").properties.name;
      // If it works, log the success to the user.
      const checkmark = chalk.green("✔")

      if (renamedNode === newName) {
        console.log(`${checkmark} Successfuly renamed the node ${chalkedNodeName} to ${chalkedNewName}`)
      } else {
        throw new Error ("Failed to rename the node.")
      }
    } catch (error) { 
      // If it doesn't, log the failure to the user.
      const xMark = chalk.red("✖");
      console.log(`${xMark} Failed to rename the node ${chalkedNodeName} to ${chalkedNewName}`) // Handles errors.
      console.log(`${chalk.magenta("TIP:")} Make sure the node called ${chalkedNodeName} truly exists.`)
    }
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
