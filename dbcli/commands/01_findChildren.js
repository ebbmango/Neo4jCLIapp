// Libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");
const logsFullArray = require("../functions/logsFullArray");

// Query
const { findChildrenQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "1",
  describe: "Finds all children of a given node.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const arguments = argv._.slice(1); // Stows the received arguments to a dedicated variable.
    await validateArguments(arguments, 1); // Ensures there is exactly the expected amount of arguments.
    await validateConnection(); // Ensures a connection to the database could be established.

    const nodeName = arguments[0]; // Creates a handler for the relevant argument.

    // Starts the queries' runner.
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    try {
      // Runs the query.
      const children = await runQuery(session, { categoryName: nodeName });
      // Formats the result.
      const chalkTitle = chalk.bold(`"${nodeName}"`);
      // Displays the result.
      console.log(`All children of the node ${chalkTitle}:\n`);
      await logsFullArray(children);
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
  return result.records.map((record) => record.get("child").properties.name);
};

module.exports = command;
