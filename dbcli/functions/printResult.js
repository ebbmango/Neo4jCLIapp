// nodeJS modules
const util = require("util");

// Fully logs the array passed as its argument and highlights each individual element from the separator commas
async function printResult(array) {
  const { default: chalk } = await import("chalk");
  console.log(
    util
      .inspect(array, { maxArrayLength: null })
      .replace(/'(.*?)'/g, chalk.yellow("$&"))
      .replace(/'/g, "")
  );
}

module.exports = printResult;
