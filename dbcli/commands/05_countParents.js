// libraries
const neo4j = require("neo4j-driver");

// functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");

// Query
const { countParentsQuery: query } = require("../queries/cypherQueries");

const command = {
  command: ["5", "count-parents"],
  describe: "Counts all parents of a given node.",
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
      const parentsCount = await runQuery(session, { categoryName: nodeName });
      // Formats the result.
      const chalkTitle = chalk.bold(`"${nodeName}"`);
      const chalkResult = chalk.yellow.bold(`${parentsCount}`);
      // Displays the result.
      console.log(
        `The amount of parents of the node ${chalkTitle} is: ${chalkResult}`
      );
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
  return result.records[0].get("parentsCount");
};

module.exports = command;
