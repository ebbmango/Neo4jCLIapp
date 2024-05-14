const neo4j = require("neo4j-driver");

async function uploadBatch(filePath) {
  const driver = neo4j.driver("bolt://localhost:7687");
  const session = driver.session();

  const cypherQuery = `LOAD CSV WITH HEADERS FROM 'file:///${filePath}' AS row \
            MERGE (c:Category {name: row.Category}) \
            MERGE (s:Category {name: row.Subcategory}) \
            MERGE (c)-[:HAS_SUBCATEGORY]->(s)`;

  try {
    await session.run(cypherQuery);
    console.log("Data loaded successfully.");
  } catch (error) {
    console.error("Error loading data:", error);
    return;
  } finally {
    await session.close();
    await driver.close();
  }
}

module.exports = { uploadBatch };
