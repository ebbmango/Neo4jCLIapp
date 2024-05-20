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

    const queryResult = await runQuery(query, {
      fromNode: node01,
      toNode: node02,
    });

    const path = [];

    // queryResult

    queryResult.records[0].get("paths").segments.forEach((segment) => {
      const startNode = segment.start.properties.name;
      const endNode = segment.end.properties.name;
      if (path.indexOf(startNode) === -1) path.push(startNode);
      if (path.indexOf(endNode) === -1) path.push(endNode);
    });

    console.log(path.join(" → "));
  },
};

module.exports = command;
