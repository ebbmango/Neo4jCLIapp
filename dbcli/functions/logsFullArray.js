// Modules
const util = require("util");

// MAIN: This function prints all elements from an array and highlights each individual element from the separator commas.
async function logsFullArray(array) {
  const { default: chalk } = await import("chalk");
  console.log(
    util
      .inspect(array, { maxArrayLength: null })
      .replace(/'(.*?)'/g, chalk.yellow("$&"))
      .replace(/'/g, "")
  );
}

module.exports = logsFullArray;
