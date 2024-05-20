// Libraries
const neo4j = require("neo4j-driver");

// Cypher Queries
const {
  constraintsQuery,
  loadCategoriesQuery,
  loadRelationshipsQuery,
  indexQuery,
} = require("../queries/uploadQueries");

// MAIN: This function loads all nodes and relationships from the CSV file into the database.
async function loadDataFromCSV(filePath) {
  // Starts the queries' runner.
  const driver = neo4j.driver("bolt://localhost:7687");
  const session = driver.session();

  try {
    // Sets up constraints.
    await session.run(constraintsQuery);

    // Loads all categories from the CSV file into the database.
    await runQueryWithSpinner(session, {
      query: loadCategoriesQuery,
      queryParameters: { filePath: `file:///${filePath}` },
      loadingText: "Loading Nodes",
      successText: "Nodes loaded successfully.",
    });
    // Creates relationships between categories and subcategories according to the CSV file.
    await runQueryWithSpinner(session, {
      query: loadRelationshipsQuery,
      queryParameters: { filePath: `file:///${filePath}` },
      loadingText: "Loading Relationships",
      successText: "Relationships loaded successfully.",
    });
  } catch (error) {
    // Handles errors
    console.error("Error processing CSV file:", error);
  } finally {
    // Terminates the queries' runner.
    await session.close();
    await driver.close();
  }
}

module.exports = { loadDataFromCSV };

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

// This functions runs a query and informs the user of its current execution status.
async function runQueryWithSpinner(
  session,
  { query, queryParameters, loadingText, successText }
) {
  const { default: ora } = await import("ora"); // Imports necessary dependencies

  const spinner = ora(loadingText).start(); // Initializes the spinner
  updateSpinner(spinner); // Updates the spinner
  await session.run(query, queryParameters); // Runs the query
  spinner.clear(); // Clears the spinner
  spinner.succeed(successText); // Displays the success text
}
