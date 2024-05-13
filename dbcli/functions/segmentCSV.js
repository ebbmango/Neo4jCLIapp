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
const { batchesFromCSV } = require("./batchesFromCSV");

async function segmentCSV(filePath, batchSize) {
  // counts the total amount of rows
  let totalRows;
  try {
    totalRows = await countRowsCSV(filePath);
  } catch (error) {
    console.error("Error reading file:", error);
    return false; // stops the code in case the file couldn't be read
  }

  const batches = [];
  let batch = [];

  batchesFromCSV(filePath, batch, totalRows, batchSize);
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
