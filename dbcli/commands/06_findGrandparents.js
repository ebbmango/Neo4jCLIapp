// Libraries
const neo4j = require("neo4j-driver");

// Functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");
const logsFullArray = require("../functions/logsFullArray");

// Query
const { findGrandparentsQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "6",
  describe: "Finds all grandparents of a given node.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const arguments = argv._.slice(1); // Stows the received arguments to a dedicated variable.
    await checkArguments(arguments, 1); // Ensures there is exactly the expected amount of arguments.
    await checkConnection(); // Ensures a connection to the database could be established.

    const nodeName = arguments[0]; // Creates a handler for the relevant argument.

    // Starts the queries' runner.
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    try {
      // Runs the query.
      const grandparents = await runQuery(session, { categoryName: nodeName });
      // Formats the result.
      const chalkTitle = chalk.bold(`"${nodeName}"`);
      // Displays the result.
      console.log(`All grandparents of the node ${chalkTitle}:\n`);
      await logsFullArray(grandparents);
    } catch (error) {
      console.error(error); // Handles errors.
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
  return result.records.map((record) => record.get("grandparent").properties.name);
};

module.exports = command;
