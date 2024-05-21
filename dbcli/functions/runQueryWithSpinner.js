// libraries
const neo4j = require("neo4j-driver");

// MAIN: This functions runs a query and informs the user of its current execution status.
async function runQueryWithSpinner({
  query,
  queryParameters,
  loadingText,
  successText,
}) {
  const { default: ora } = await import("ora"); // Imports necessary dependencies

  // Starts the queries' runner.
  const driver = neo4j.driver("bolt://localhost:7687");
  const session = driver.session();

  const spinner = ora(loadingText).start(); // Initializes the spinner
  updateSpinner(spinner); // Updates the spinner

  var startTime = performance.now();
  
  const result = await session.run(query, queryParameters); // Runs the query
  
  var endTime = performance.now();

  spinner.clear(); // Clears the spinner
  spinner.succeed(successText); // Displays the success text

  // Terminates the queries' runner.
  await session.close();
  await driver.close();

  return { queryResult: result, executionTime: endTime - startTime };
}

// Auxiliary functions:

// This function updates the spinner's text and color.
function updateSpinner(spinner) {
  const colors = ["green", "yellow", "blue", "magenta", "cyan"];
  const dots = ["", ".", "..", "..."];

  let colorIndex = 0;
  let dotIndex = 0;

  setInterval(() => {
    // Updates color
    spinner.color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;

    // Updates dots
    spinner.text = spinner.text.replace(/[.]/g, "") + dots[dotIndex];
    dotIndex = (dotIndex + 1) % dots.length;
  }, 1000); // Every second
}

module.exports = runQueryWithSpinner;
