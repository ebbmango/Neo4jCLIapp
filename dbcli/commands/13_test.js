// Libraries
const neo4j = require("neo4j-driver");

// Functions

const logsFullArray = require("../functions/logsFullArray");

// Query
const { findChildrenQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "13 <name>",
  describe: "Finds all children of a given node.",
  builder: (yargs) => {
    return yargs
      .positional("name", {
        describe: "Name of the node",
        type: "string",
      })
      .strict(); // Enable strict mode to throw an error for too many arguments
  },
  handler: async (argv) => {
    console.log(argv);
  },
};

// Auxiliary function
const runQuery = async (session, queryParameters) => {
  const result = await session.run(query, queryParameters);
  return result.records.map((record) => record.get("child").properties.name);
};

module.exports = command;
