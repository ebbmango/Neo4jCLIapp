// As explained here (https://neo4j.com/docs/getting-started/data-import/csv-import/#optimizing-load-csv),
// to optimize our LOAD CSV query for performance, we should separate node and relationship creation.

// Setting up UNIQUENESS constraint.
const setUpConstraints = async (session) => {
  const query =
    "CREATE CONSTRAINT IF NOT EXISTS ON (c:Category) ASSERT c.name IS UNIQUE;";

  await session.run(query);
  console.log("Constraints have been set up.");
};

// Loading all categories and subcategories.
const loadCategories = async (session, filePath) => {
  const query = `
  LOAD CSV FROM $filePath AS row
  CALL {
    WITH trim(row[0]) AS category, trim(row[1]) AS subcategory
    WHERE category IS NOT NULL AND subcategory IS NOT NULL
    MERGE (c:Category {name: category})
    MERGE (s:Category {name: subcategory})
  } IN TRANSACTIONS OF 100000 ROWS;
  `;

  await session.run(query, { filePath: `file:///import/${filePath}` });
};

const loadRelationships = async (session, filePath) => {
  const query = `
    LOAD CSV FROM $filePath AS row
    CALL {
      WITH trim(row[0]) AS category, trim(row[1]) AS subcategory
      WHERE category IS NOT NULL AND subcategory IS NOT NULL
      MATCH (c:Category {name: category})
      MATCH (s:Category {name: subcategory})
      MERGE (c)-[:HAS_SUBCATEGORY]->(s)
    RETURN count(*)
  `;

  await session.run(query, { filePath: `file:///import/${filePath}` });
};

module.exports = { setUpConstraints, loadCategories, loadRelationships };
