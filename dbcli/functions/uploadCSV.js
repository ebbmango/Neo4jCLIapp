const neo4j = require("neo4j-driver");

const {
  setUpConstraints,
  loadCategories,
  loadRelationships,
  countRowsCSV,
} = require("./cypherQueries");

async function uploadCSV(filePath) {

  const driver = neo4j.driver("bolt://localhost:7687");
  const session = driver.session();

  try {
    const rows = await countRowsCSV(session, filePath)
    console.log(rows)
    
    // // Sets up constraints.
    // await setUpConstraints(session);

    // // Clears existing data (in case the user restarts a docker container instead of using the "connect" command).
    // await session.run("MATCH (n) DETACH DELETE n");

    // // Loads categories and subcategories as "Category" nodes.
    // await loadCategories(session, filePath);

    // // Creates relationships between categories and subcategories.
    // await loadRelationships(session, filePath);

    console.log("CSV file processed successfully.");
  } catch (error) {
    console.error("Error processing CSV file:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

module.exports = { uploadCSV };
