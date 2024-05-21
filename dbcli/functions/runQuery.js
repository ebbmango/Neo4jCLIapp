const neo4j = require("neo4j-driver");

const runQuery = async (query, queryParameters) => {
  // Starts the queries' runner.
  const driver = neo4j.driver("bolt://localhost:7687");
  const session = driver.session();

  var startTime = performance.now();

  // Runs the query.
  const result = await session.run(query, queryParameters);

  var endTime = performance.now();

  // Terminates the queries' runner.
  await session.close();
  await driver.close();

  // Returns the result.
  return { queryResult: result, executionTime: endTime - startTime };
};

module.exports = runQuery;
