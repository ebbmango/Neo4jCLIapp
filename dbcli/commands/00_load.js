// libraries
const fs = require("fs");
const neo4j = require("neo4j-driver");

// functions
const { checkFileExists } = require("../functions/checkFileExists");
const { segmentCSV } = require("../functions/segmentCSV");

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

    // stowing only the arguments (command name excluded) in an array
    const arguments = argv._.slice(1);

    // making sure that the user has provided an argument to the command (that is, the path to the file)
    if (arguments.length === 0) {
      console.error("Error: You must provide the pathname of the CSV file.");
      return;
    }

    // retrieving the file path
    const filePath = arguments[0];

    // checking whether the file exists
    checkFileExists(filePath)
      .then((exists) => {
        if (!exists) {
          console.error(`File ${filePath} does not exist.`);
          return false; // in case it doesn't, halts the program
        }
      })
      .catch((err) => {
        console.error("Error checking file existence:", err);
        return false; // in case an error occurs, halts the program
      });

    //
    // PART 2 - POPULATING DATABASE

    // 2.1 - Reading from CSV

    segmentCSV(filePath, 10000);

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
