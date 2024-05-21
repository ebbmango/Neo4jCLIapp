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
