// Libraries
const neo4j = require("neo4j-driver");

// Functions
const runQueryWithSpinner = require("./runQueryWithSpinner");

// Cypher Queries
const {
  constraintsQuery,
  loadCategoriesQuery,
  loadRelationshipsQuery,
  indexQuery,
} = require("../queries/uploadQueries");
const runQuery = require("./runQuery");

// MAIN: This function loads all nodes and relationships from the CSV file into the database.
async function loadDataFromCSV(filePath) {
  try {
    // Sets up constraints.
    await runQuery(constraintsQuery, {});

    // Loads all categories from the CSV file into the database.
    await runQueryWithSpinner({
      query: loadCategoriesQuery,
      queryParameters: { filePath: `file:///${filePath}` },
      loadingText: "Loading Nodes",
      successText: "Nodes loaded successfully.",
    });

    // Creates relationships between categories and subcategories according to the CSV file.
    await runQueryWithSpinner({
      query: loadRelationshipsQuery,
      queryParameters: { filePath: `file:///${filePath}` },
      loadingText: "Loading Relationships",
      successText: "Relationships loaded successfully.",
    });
  } catch (error) {
    // Handles errors
    console.error("Error processing CSV file:", error);
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
