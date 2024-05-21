// libraries
const neo4j = require("neo4j-driver");

// Functions
const runQuery = require("../functions/runQuery");
const { findPathsQuery: query } = require("../queries/cypherQueries");

const command = {
  command: "12 <node_1> <node_2>",
  aliases: ["find-paths"],
  describe:
    "Finds all paths between two given nodes, with directed edges from the first to the second node.",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const node01 = argv["node_1"];
    const node02 = argv["node_2"];
    const maxLevel = argv["level"];

    // Running the query
    const queryResult = await runQuery(query, {
      nodeFrom: node01,
      nodeTo: node02,
      maxDistance: neo4j.int(maxLevel),
    });

    const paths = [];

    // Extracting all paths
    const pathObjects = queryResult.records.map((record) => {
      return record.get("path");
    });

    // Reading each individual path
    pathObjects.forEach((pathObject) => {
      // Initializing an array to hold the names of each traversed node.
      const path = [];

      // Adding the start of the path to the array.
      path.push(pathObject.start.properties.name);

      // Adding each traversed path along the way to the array.
      const segments = pathObject.segments;
      for (let i = 1; i < segments.length; i++) {
        path.push(segments[i].start.properties.name);
      }

      // Adding the end of the path to the array.
      path.push(pathObject.end.properties.name);

      // Pushing the array to the paths array.
      paths.push(path);
    });

    // Logging each path to the console.
    paths.forEach((path) => {
      console.log(`${path.join(" → ")}\n`);
    });
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe: "Specifies the current name of the node you intend to rename.",
        type: "string",
      })
      .positional("<new_name>", {
        describe: "Specifies the new name you wish to assign to the node.",
        type: "string",
      })
      .option("level", {
        describe: "Specifies the maximum depth of the search tree. Greater depths may lead to longer execution times.",
        type: "integer",
        default: 15, 
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
