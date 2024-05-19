// libraries
const neo4j = require("neo4j-driver");

// functions
const checkArguments = require("../functions/checkArguments");
const checkConnection = require("../functions/checkConnection");
const printResult = require("../functions/printResult");

// runner function for the relevant Cypher Query
const findParents = async (session, nodeName) => {
  const query = // This query should find all parents of the node whose name is given by the "nodeName" parameter
    " \
    MATCH (node:Category {name: $categoryName})<-[:HAS_SUBCATEGORY]-(parent:Category) \
    RETURN parent \
    ORDER BY parent.name ASC \
    ";

  const result = await session.run(query, { categoryName: nodeName });

  const parents = result.records.map(
    (record) => record.get("parent").properties.name
  );

  return parents;
};

const command = {
  command: "4",
  describe: "Finds all parents of a given node.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    // Stows only the arguments (discards the command name) in a dedicated variable.
    const arguments = argv._.slice(1);

    // If the user provides more arguments than is expected by the command, warn them and stop the execution.
    await checkArguments(arguments, 1);

    // Stows only the needed argument (the name of the node whose children we want to find) in a dedicated variable.
    const nodeName = arguments[0];

    // If a connection to the database cannot be established, inform the user and stop the execution.
    await checkConnection();

    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    try {
      const parents = await findParents(session, nodeName);
      console.log(`All parents of the node ${chalk.bold(`"${nodeName}"`)}:\n`);
      await printResult(parents);
    } catch (error) {
      console.error(error);
    } finally {
      await session.close();
      await driver.close();
    }
  },
};

module.exports = command;
