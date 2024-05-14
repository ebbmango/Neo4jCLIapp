// libraries
const fs = require("fs");
const { parse } = require("csv-parse");

// functions
const { validateCSV } = require("../functions/validateCSV");
const { countRowsCSV } = require("../functions/countRowsCSV");
const { writeBatchToCSV } = require("../functions/writeBatchToCSV");
const { uploadBatch } = require("../functions/uploadBatch");

// command
const command = {
  command: "load",
  describe:
    "Loads the database with the data provided by the CSV file passed as its argument.",
  handler: async (argv) => {
    // 01 - Validating the file
    let filePath;
    try {
      filePath = validateCSV(argv); // Checks whether the user has provided a valid file path
    } catch (error) {
      // If an error occurs...
      console.error(error.message); // Informs the user
      return false; // And halts program execution
    }

    // 02 - Counting the total amount of rows
    let totalRows;
    try {
      totalRows = await countRowsCSV(filePath);
    } catch (error) {
      console.error("Error reading file:", error);
      return false; // Stops the code in case the file couldn't be read
    }

    // 03 - Reading the whole CSV file:
    const batchSize = 10000;
    let batches = 0;
    let rowCount = 0;
    let batch = [];

    fs.createReadStream(filePath)
      .pipe(
        parse({
          delimiter: ",",
          escape: "\\",
        })
      )
      .on("data", async (row) => {
        const prettyRow = prettifyRow(row);
        batch.push(prettyRow);
        rowCount++;

        // if the max size for a batch has been reached OR if all rows have been read
        if (rowCount % batchSize === 0 || rowCount === totalRows) {
          try {
            batches++;
            const filePath = await writeBatchToCSV(batch);
            console.log(`Batch no. ${batches} written to file.`);
            await uploadBatch(filePath);
          } catch (error) {
            console.error("Error writing CSV file:", error);
          }

          batch = [];
        }
      })
      .on("end", () => {
        console.log(batches.length + " batches have been created.");
      });
  },
};

module.exports = command;

function prettifyRow(row) {
  return row.map((string) => {
    return string.replace(/_/g, " ");
  });
}

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
