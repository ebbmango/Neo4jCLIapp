const {
  Worker,
  isMainThread,
  parentPort,
  workerData,
} = require("worker_threads");
const fs = require("fs");
const { parse } = require("csv-parse");

const { countRowsCSV } = require("./countRowsCSV");
const { writeBatchToCSV } = require("./writeBatchToCSV");
// const { batchesFromCSV } = require("./batchesFromCSV");

async function segmentCSV(filePath, batchSize) {
  // Counts the total amount of rows
  let totalRows;
  try {
    totalRows = await countRowsCSV(filePath);
  } catch (error) {
    console.error("Error reading file:", error);
    return false; // Stops the code in case the file couldn't be read
  }

  let batches = [];
  let batch = [];
  let rowCount = 0;

  fs.createReadStream(filePath)
    .pipe(
      parse({
        delimiter: ",",
        escape: "\\",
      })
    )
    .on("data", (row) => {
      const prettyRow = prettifyRow(row);
      batch.push(prettyRow);
      rowCount++;

      // if the max size for a batch has been reached OR if all rows have been read
      if (rowCount % batchSize === 0 || rowCount === totalRows) {
        batches.push(batch); // push the current batch
        batch = []; // reset it
      }
    })
    .on("end", () => {
      console.log(batches.length + " batches have been created.");
    });
}

module.exports = { segmentCSV };

// const driver = neo4j.driver("bolt://localhost:7687");
// const session = driver.session();

// batches
//   for (let currentRow = 0; currentRow < totalRows; currentRow += batchSize) {
//     const batch = [];
//     // each row in each batch
//     for (let index = 0; index < batchSize; index++) {
//       console.log(currentRow + index);
//       if (index + currentRow === totalRows) break;
//     }
//   }

function prettifyRow(row) {
  return row.map((string) => {
    return string.replace(/_/g, " ");
  });
}
