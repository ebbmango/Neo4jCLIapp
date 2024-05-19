// libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");
const logsFullArray = require("../functions/logsFullArray");

// Queries
const { countMinChildrenQuery, findNodesWithChildrenAmountQuery } = require("../queries/cypherQueries");


const command = {
  command: ["10", "find-infertile"],
  describe:
    "Finds the nodes with the least children (there could be more than one). Childless nodes are not considered.",
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
      const minChildrenCount = await countMinChildren(session);
      const infertileNodes = await findInfertile(session, {amount: neo4j.int(minChildrenCount)})
      // Formats the result.
      const chalkHighlight = chalk.bold("with the least children");
      const formattedAmount = new Intl.NumberFormat("en", {minimumIntegerDigits: 3}).format(minChildrenCount);
      const chalkAmount = chalk.yellow(formattedAmount)
      const chalkTitle = `${chalkHighlight} (${chalkAmount})`
      const singleResult = infertileNodes.length === 1;
      const headerLine = `The ${singleResult ? "node" : "nodes"} ${chalkTitle} ${singleResult? "is" : "are"}:\n`
      // Displays the result.
      console.log(headerLine);
      await logsFullArray(infertileNodes);
    } catch (error) {
      console.error(error); // Handles errors.
    } finally {
      // Terminates the queries' runner.
      await session.close();
      await driver.close();
    }
  },
};

const countMinChildren = async (session) => {
  const result = await session.run(countMinChildrenQuery);
  return result.records[0].get("minChildrenCount");
};

const findInfertile = async (session, queryParameters) => {
  const result = await session.run(findNodesWithChildrenAmountQuery, queryParameters);
  return result.records.map((record) => record.get("node").properties.name);
};


module.exports = command;
