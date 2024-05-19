// Libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");

// Query
const { countUniqueNodesQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "7",
  describe: "Counts how many uniquely named nodes there are.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const arguments = argv._.slice(1); // Stows the received arguments to a dedicated variable.
    await validateArguments(arguments, 0); // Ensures there is exactly the expected amount of arguments.
    await validateConnection(); // Ensures a connection to the database could be established.

    // Starts the queries' runner.
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    try {
      // Runs the query.
      const uniqueCount = await runQuery(session);
      // Formats the result.
      const formattedCount = new Intl.NumberFormat("en", {minimumIntegerDigits: 3}).format(uniqueCount);
      const chalkTitle = chalk.bold("uniquely named nodes");
      const chalkContent = chalk.yellow.bold(`${formattedCount}`);
      // Displays the result.
      console.log(`The amount of ${chalkTitle} is: ${chalkContent}`);
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
  return result.records[0].get("uniqueCount");
};

module.exports = command;
