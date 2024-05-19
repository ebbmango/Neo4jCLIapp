// libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");

// Query
const { renameQuery: query } = require("../queries/cypherQueries");

const command = {
  command: ["11", "rename"],
  describe: "Renames a given node.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const arguments = argv._.slice(1); // Stows the received arguments to a dedicated variable.
    await validateArguments(arguments, 2); // Ensures there is exactly the expected amount of arguments.
    await validateConnection(); // Ensures a connection to the database could be established.

    const [nodeName, newName] = arguments; // Creates a handler for the relevant argument.

    // Starts the queries' runner.
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();
    
    const chalkedNodeName = chalk.yellow(`"${nodeName}"`);
    const chalkedNewName = chalk.yellow(`"${newName}"`);

    try {
      // Runs the query.
      const renamedNode = await runQuery(session, { categoryName: nodeName, newName });
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
    } finally {
      // Terminates the queries' runner.
      await session.close();
      await driver.close();
    }
  },
};

// Auxiliary function
const runQuery = async (session, queryParameters) => {
  const result = await session.run(query, queryParameters);
  return result.records[0].get("node").properties.name;
};

module.exports = command;
