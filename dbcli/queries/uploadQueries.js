// As explained here (https://neo4j.com/docs/getting-started/data-import/csv-import/#optimizing-load-csv),
// to optimize our LOAD CSV query for performance, we should separate node and relationship creation.

// This query sets up a UNIQUENESS constraint on the "name" property of each "Category" node
const constraintsQuery = `
CREATE CONSTRAINT IF NOT EXISTS FOR (c:Category)
REQUIRE c.name IS UNIQUE;
`;

// This query loads all "Category" nodes from the CSV file in batches of 100,000 rows
const loadCategoriesQuery = `
LOAD CSV FROM $filePath AS row
WITH trim(row[0]) AS category, trim(row[1]) AS subcategory
WHERE category IS NOT NULL AND subcategory IS NOT NULL
CALL {
  WITH category, subcategory
  MERGE (c:Category {name: category})
  MERGE (s:Category {name: subcategory})
} IN TRANSACTIONS OF 100000 ROWS;
`;

// This query loads all relationships between "Category" nodes from the CSV file in batches of 100,000 rows
const loadRelationshipsQuery = `
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

module.exports = {
  constraintsQuery,
  loadCategoriesQuery,
  loadRelationshipsQuery,
};
