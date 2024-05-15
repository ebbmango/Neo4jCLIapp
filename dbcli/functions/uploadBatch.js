const neo4j = require("neo4j-driver");

async function uploadBatch(driver) {
  const session = driver.session();

  // console.log(filePath);

  const cypherQuery = `LOAD CSV WITH HEADERS FROM 'file:///temp_file.csv' AS row \
            MERGE (c:Category {name: row.Category}) \
            MERGE (s:Category {name: row.Subcategory}) \
            MERGE (c)-[:HAS_SUBCATEGORY]->(s)`;

  await session.run(cypherQuery).subscribe({
    onCompleted: () => {
      session.close(); // Closes the session.
    },
    onError: (error) => {
      throw new Error(error);
    },
  });
}

module.exports = { uploadBatch };
