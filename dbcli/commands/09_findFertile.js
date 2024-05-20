// libraries
const neo4j = require("neo4j-driver");

// Functions
const runQuery = require("../functions/runQuery");
const logsFullArray = require("../functions/logsFullArray");

// Queries
const { countMaxChildrenQuery, findNodesWithChildrenAmountQuery } = require("../queries/cypherQueries");

const command = {
  command: "9",
  aliases: ["find-fertile"],
  describe:
    "Finds the nodes with the most children (there could be more than one).",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

      // Runs the queries.
      const countQueryResult = await runQuery(countMaxChildrenQuery, {});
      const maxChildrenCount = countQueryResult.records[0].get("maxChildrenCount")
      
      const findQueryResult = await runQuery(findNodesWithChildrenAmountQuery, {amount: neo4j.int(maxChildrenCount)})
      const fertileNodes = findQueryResult.records.map((record) => record.get("node").properties.name);

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

  },
};

module.exports = command;
