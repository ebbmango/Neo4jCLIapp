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

    // Running the query
    const queryResult = await runQuery(query, {
      nodeFrom: node01,
      nodeTo: node02,
      maxDistance: neo4j.int(5),
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

    paths.forEach((path) => {
      console.log(`${path.join(" → ")}\n`);
    });
  },
};

module.exports = command;
