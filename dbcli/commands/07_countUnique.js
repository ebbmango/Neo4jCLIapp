// Libraries
const neo4j = require("neo4j-driver");

// Functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");

// Runner function for the relevant cypher query:
const countUnique = async (session) => {
  const query = // This query should count all uniquely named nodes.
    "MATCH (node:Category) RETURN COUNT (DISTINCT node.name) AS uniqueCount";

  const result = await session.run(query);

  return result.records[0].get("uniqueCount");
};

const command = {
  command: "7",
  describe: "Counts how many uniquely named nodes there are.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    // Validates user input and ensures connection to the database.
    const arguments = argv._.slice(1);
    await checkArguments(arguments, 0);
    await checkConnection();

    // Starts the queries' runner.
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    try {
      // Retrieves the relevant value.
      const uniqueCount = await countUnique(session);

      // Adequately formats the display values.
      const formattedCount = new Intl.NumberFormat("en", {minimumIntegerDigits: 3}).format(uniqueCount);
      const chalkHighlight = chalk.bold("uniquely named nodes");
      const chalkContent = chalk.yellow.bold(`${formattedCount}`);

      // Displays the value to the user.
      console.log(`The amount of ${chalkHighlight} is: ${chalkContent}`);
    } catch (error) {
      // Handles errors.
      console.error(error);
    } finally {
      // Terminates the queries' runner
      await session.close();
      await driver.close();
    }
  },
};

module.exports = command;
