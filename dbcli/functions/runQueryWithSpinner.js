// libraries
const neo4j = require("neo4j-driver");
const updateSpinner = require("./updateSpinner");

// MAIN: This functions runs a query and informs the user of its current execution status.
async function runQueryWithSpinner({
  query,
  queryParameters,
  loadingText,
  successText,
  errorText,
}) {
  const { default: ora } = await import("ora"); // Imports necessary dependencies

  // Starts the queries' runner.
  const driver = neo4j.driver("bolt://localhost:7687");
  const session = driver.session();

  const spinner = ora(loadingText).start(); // Initializes the spinner
  updateSpinner(spinner); // Updates the spinner

  let result;

  try {
    const startTime = performance.now();
    result = await session.run(query, queryParameters); // Runs the query
    spinner.clear(); // Clears the spinner
    spinner.succeed(successText); // Displays the success text
    const endTime = performance.now();
    return { queryResult: result, executionTime: endTime - startTime };
  } catch (error) {
    spinner.clear(); // Clears the spinner
    spinner.fail(errorText); // Displays the success text
    throw error;
  } finally {
    // Terminates the queries' runner.
    await session.close();
    await driver.close();
  }
}

module.exports = runQueryWithSpinner;
