// libraries
const fs = require("fs");
const { parse } = require("csv-parse");
const neo4j = require("neo4j-driver");
const readline = require("readline");

// functions
const { validateCSV } = require("../functions/validateCSV");
const { countRowsCSV } = require("../functions/countRowsCSV");
const { uploadRow } = require("../functions/uploadRow");

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
    const driver = neo4j.driver("bolt://localhost:7687");

    let rowCount = 0;

        // Initialize readline interface
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });
    
        const updateLoadingScreen = () => {
          const percentage = ((rowCount / totalRows) * 100).toFixed(2);
          readline.cursorTo(process.stdout, 0);
          process.stdout.write(`Uploading: ${rowCount} / ${totalRows} rows (${percentage}%)`);
        };

    fs.createReadStream(filePath)
      .pipe(
        parse({
          delimiter: ",",
          escape: "\\",
        })
      )
      .on("data", async (row) => {
        // upload loading screen here!!!

        const prettyRow = prettifyRow(row);

        // data handling comes here
        uploadRow(driver, prettyRow);
        // finish data handling

        rowCount++;
        updateLoadingScreen();
      })
      .on("end", () => {
        // console.log(batches.length + " batches have been created.");
      });

    // await session.close();
    await driver.close();
  },
};

module.exports = command;

function prettifyRow(row) {
  return row.map((string) => {
    return string.replace(/_/g, " ");
  });
}