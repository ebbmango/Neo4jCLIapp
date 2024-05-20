// libraries
const neo4j = require("neo4j-driver");

// Functions
const runQuery = require("../functions/runQuery");
const logsFullArray = require("../functions/logsFullArray");

// Queries
const { countMinChildrenQuery, findNodesWithChildrenAmountQuery } = require("../queries/cypherQueries");

const command = {
  command: "10",
  aliases: ["find-infertile"],
  describe:
    "Finds the nodes with the least children (there could be more than one). Childless nodes are not considered.",
  // FUNCTION
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    // Runs the queries.
    const countQueryResult = await runQuery(countMinChildrenQuery, {});
    const minChildrenCount = countQueryResult.records[0].get("minChildrenCount")
    
    const findQueryResult = await runQuery(findNodesWithChildrenAmountQuery, {amount: neo4j.int(minChildrenCount)})
    const infertileNodes = findQueryResult.records.map((record) => record.get("node").properties.name);

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
  },
};

module.exports = command;
