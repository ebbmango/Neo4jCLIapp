const neo4j = require("neo4j-driver");

async function uploadRow(driver, [category, subcategory]) {
  // Starts the session.
  const session = driver.session();

  // Runs the query.
  session
    .run(
      // (query)
      `
      MERGE (c:Category {name: $category}) \
      MERGE (s:Category {name: $subcategory}) \
      MERGE (c)-[:HAS_SUBCATEGORY]->(s)
      `,
      // (query's parameters)
      {
        category,
        subcategory,
      }
    )
    .subscribe({
      onCompleted: () => {
        session.close(); // Closes the session.
      },
      onError: (error) => {
        throw new Error(error);
      },
    });

  // const session = driver.session();

  // const cypherQuery = `MERGE (c:Category {name: row.Category}) \
  //                      MERGE (s:Category {name: row.Subcategory}) \
  //                      MERGE (c)-[:HAS_SUBCATEGORY]->(s)`;

  // try {
  //   await session.run(cypherQuery);
  //   console.log("Data loaded successfully.");
  // } catch (error) {
  //   console.error("Error loading data:", error);
  //   return;
  // } finally {
  //   await session.close();
  //   await driver.close();
  // }
}

module.exports = { uploadRow };
