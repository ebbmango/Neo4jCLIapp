// libraries
const neo4j = require("neo4j-driver");

// Functions

const command = {
  command: "12 <node_1> <node_2>",
  aliases: ["find-paths"],
  describe:
    "Finds all paths between two given nodes, with directed edges from the first to the second node.",
  // FUNCTION
  handler: async (argv) => {

    const node01 = argv["node_1"];
    const node02 = argv["node_2"];

    console.log("Task 12 - Work in progress");
  },
};

module.exports = command;
