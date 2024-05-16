// As explained here (https://neo4j.com/docs/getting-started/data-import/csv-import/#optimizing-load-csv),
// to optimize our LOAD CSV query for performance, we should separate node and relationship creation.

// Counting the total amount of rows in the provided CSV file
const countRowsCSV = async (session, filePath) => {
  const query = `
  LOAD CSV FROM $filePath AS row
  RETURN count(row) AS totalRows;
  `;
  const result = await session.run(query, { filePath: `file:///${filePath}` });
  return result.records[0].get("totalRows").toInt();
};

// Setting up UNIQUENESS constraint.
const setUpConstraints = async (session) => {
  const query =
    "CREATE CONSTRAINT IF NOT EXISTS FOR (c:Category) REQUIRE c.name IS UNIQUE;";

  await session.run(query);
};

// Loading all categories and subcategories.
const loadCategories = async (session, filePath) => {
  const query = `
  LOAD CSV FROM $filePath AS row
  WITH trim(row[0]) AS category, trim(row[1]) AS subcategory
  WHERE category IS NOT NULL AND subcategory IS NOT NULL
  CALL {
    WITH category, subcategory
    MERGE (c:Category {name: category})
    MERGE (s:Category {name: subcategory})
  } IN TRANSACTIONS OF 100000 ROWS;
  `;

  await session.run(query, { filePath: `file:///${filePath}` });
};

const loadRelationships = async (session, filePath) => {
  const query = `
  LOAD CSV FROM $filePath AS row
  WITH trim(row[0]) AS category, trim(row[1]) AS subcategory
  WHERE category IS NOT NULL AND subcategory IS NOT NULL
  CALL {
    WITH category, subcategory
    MATCH (c:Category {name: category})
    MATCH (s:Category {name: subcategory})
    MERGE (c)-[:HAS_SUBCATEGORY]->(s)
  } IN TRANSACTIONS OF 100000 ROWS;
  `;

  await session.run(query, { filePath: `file:///${filePath}` });
};

module.exports = {
  setUpConstraints,
  loadCategories,
  loadRelationships,
  countRowsCSV,
};
