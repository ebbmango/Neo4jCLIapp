// libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");
const logsFullArray = require("../functions/logsFullArray");

// Queries
const { countMaxChildrenQuery, findNodesWithChildrenAmountQuery } = require("../queries/cypherQueries");


const command = {
  command: ["9", "find-fertile"],
  describe:
    "Finds the nodes with the most children (there could be more than one).",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const arguments = argv._.slice(1); // Stows the received arguments to a dedicated variable.
    await validateArguments(arguments, 0); // Ensures there is exactly the expected amount of arguments.
    await validateConnection(); // Ensures a connection to the database could be established.

    // Starts the queries' runner.
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    try {
      // Runs the queries.
      const maxChildrenCount = await countMaxChildren(session);
      const fertileNodes = await findFertile(session, {amount: neo4j.int(maxChildrenCount)})
      // Formats the result.
      const chalkHighlight = chalk.bold("with the most children");
      const formattedAmount = new Intl.NumberFormat("en", {minimumIntegerDigits: 3}).format(maxChildrenCount);
      const chalkAmount = chalk.yellow(formattedAmount)
      const chalkTitle = `${chalkHighlight} (${chalkAmount})`
      const singleResult = fertileNodes.length === 1;
      const headerLine = `The ${singleResult ? "node" : "nodes"} ${chalkTitle} ${singleResult? "is" : "are"}:\n`
      // Displays the result.
      console.log(headerLine);
      await logsFullArray(fertileNodes);
    } catch (error) {
      console.error(error); // Handles errors.
    } finally {
      // Terminates the queries' runner.
      await session.close();
      await driver.close();
    }
  },
};

const countMaxChildren = async (session) => {
  const result = await session.run(countMaxChildrenQuery);
  return result.records[0].get("maxChildrenCount");
};

const findFertile = async (session, queryParameters) => {
  const result = await session.run(findNodesWithChildrenAmountQuery, queryParameters);
  return result.records.map((record) => record.get("node").properties.name);
};


module.exports = command;
