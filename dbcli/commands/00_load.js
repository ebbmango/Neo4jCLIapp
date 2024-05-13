const fs = require("fs");
const neo4j = require("neo4j-driver");

// Check if a file exists at a given path
function checkFileExists(filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        if (err.code === "ENOENT") {
          // File does not exist
          resolve(false);
        } else {
          // Other error occurred
          reject(err);
        }
      } else {
        // File exists
        resolve(true);
      }
    });
  });
}

const command = {
  command: "load",
  describe:
    "Creates the database and loads it with the data provided by the CSV file passed as its argument.",
  handler: (argv) => {
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    session
      .run("CREATE (n:Person {name: 'Heesung', age: 40}) RETURN n")
      .then((result) => {
        result.records.forEach((record) => {
          console.log(record.get("n"));
        });
      })
      .catch((error) => {
        console.error("Error creating node:", error);
      })
      .finally(() => {
        session.close();
        driver.close();
      });

    // session.close();
    

    //   session
    // .then(() => {
    //   console.log("Session successfully established");
    //   // Now you can run your queries here
    // })
    // .catch(error => {
    //   console.error("Error establishing session:", error);
    // });

    // // stowing only the arguments (command name excluded) in an array
    // const arguments = argv._.slice(1);

    // // making sure that the user has provided a pathname
    // if (arguments.length === 0) {
    //   console.error("Error: You must provide the pathname of the CSV file.");
    //   return;
    // }

    // const filePath = arguments[0];

    // // checks whether the file exists
    // checkFileExists(filePath)
    //   .then((exists) => {
    //     if (!exists) {
    //       console.log(`File ${filePath} does not exist.`);
    //       return false; // in case it doesn't, halts the program
    //     }
    //   })
    //   .catch((err) => {
    //     console.error("Error checking file existence:", err);
    //     return false; // in case an error occurs, halts the program
    //   });
  },
};

module.exports = command;
