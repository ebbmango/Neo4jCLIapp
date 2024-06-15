// libraries
const neo4j = require("neo4j-driver");

// Functions
const runQueryWithSpinner = require("../functions/runQueryWithSpinner");
const chalkText = require("../functions/chalkText");
const displayResult = require("../functions/displayResult");

// Query
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
    const depth = argv["depth"];

    // Running the query
    const { queryResult, executionTime } = await runQueryWithSpinner({
      query,
      queryParameters: {
        nodeFrom: node01,
        nodeTo: node02,
        maxDistance: neo4j.int(depth),
      },
      loadingText: await chalkText(
        `Finding all paths between nodes <ylw>"${node01}"</ylw> and <ylw>"${node02}"</ylw> (max depth: <ylw>${depth}</ylw>)`
      ),
      successText: "Query completed.",
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

    // Formatting the result:
    const displayStringElements = [];

    paths.forEach(async (path) => {
      const depth = path.length - 1;

      const pathString = path
        .map((node) => {
          return chalk.yellow(node);
        })
        .join(`\n${chalk.bgYellow(" → ")} `);

      displayStringElements.push(`${pathString} (depth: ${depth})`);
    });

    const displayString = displayStringElements.join("\n\n");

    // Displaying the result:
    await displayResult({
      executionTime,
      header: `\n<wht>All paths</wht> between nodes <ylw>"${node01}"</ylw> and <ylw>"${node02}"</ylw>:\n`,
      data: displayString,
    });

    // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
    process.exit();
  },
  // --help
  builder: (yargs) => {
    return yargs
      .positional("<node_name>", {
        describe:
          "Specifies the current name of the node you intend to rename.",
        type: "string",
      })
      .positional("<new_name>", {
        describe: "Specifies the new name you wish to assign to the node.",
        type: "string",
      })
      .option("depth", {
        describe:
          "Specifies the maximum depth of the search tree. Greater depths may lead to longer execution times.",
        type: "integer",
        default: 15,
      })
      .strict(); // Enables strict mode: throws an error for too many arguments.
  },
};

module.exports = command;
