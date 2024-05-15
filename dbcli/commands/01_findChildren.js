const neo4j = require("neo4j-driver");

const command = {
  command: "1",
  describe: "Finds all children of a given node.",
  handler: (argv) => {
    // console.log("Task 01 - Work in progress");
    const arguments = argv._.slice(1);

    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    session
      .run(
        // Query
        `
      MATCH (n:Category)
      WHERE n.name = $category
      RETURN n
      `,
        { category: arguments[0] }
      )
      .then((result) => {
        result.records.forEach((record) => {
          console.log(record.get("n")); // Logs the node
        });
      })
      .catch((error) => {
        console.error("Error executing query:", error);
      })
      .finally(() => {
        session.close(); // Closes the session
        driver.close(); // Closes the driver
      });

    // console.log(arguments)
  },
};

module.exports = command;
