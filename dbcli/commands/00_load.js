// libraries
const fs = require("fs");
const neo4j = require("neo4j-driver");

// functions
const { segmentCSV } = require("../functions/segmentCSV");
const { validateCSV } = require("../functions/validateCSV");

// const { countRowsCSV } = require("../functions/countRowsCSV");
// const { count } = require("console");

// const segmentCSV = require("../functions/segmentCSV");

// command
const command = {
  command: "load",
  describe:
    "Loads the database with the data provided by the CSV file passed as its argument.",
  handler: async (argv) => {
    //
    // PART 1 - VALIDATION

    try {
      validateCSV(argv); // Checks whether the user has provided a valid file path
    } catch (error) {
      // If an error occurs...
      console.error(error.message); // Informs the user
      return false; // And halts program execution
    }

    console.log("helo, file is valid");

    //
    // PART 2 - POPULATING DATABASE

    // 2.1 - Reading from CSV

    // segmentCSV(filePath, 10000);

    // 2.2 - Uploading to Database

    //
    //
    //
    //
    // LEFTOVER CODE
    // const driver = neo4j.driver("bolt://localhost:7687");
    // const session = driver.session();

    // session
    //   .run("CREATE (n:Person {name: 'Heesung', age: 40}) RETURN n")
    //   .then((result) => {
    //     result.records.forEach((record) => {
    //       console.log(record.get("n"));
    //     });
    //   })
    //   .catch((error) => {
    //     console.error("Error creating node:", error);
    //   })
    //   .finally(() => {
    //     session.close();
    //     driver.close();
    //   });

    // session.close();

    //   session
    // .then(() => {
    //   console.log("Session successfully established");
    //   // Now you can run your queries here
    // })
    // .catch(error => {
    //   console.error("Error establishing session:", error);
    // });
  },
};

module.exports = command;
