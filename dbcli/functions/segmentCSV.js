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


  let batches = [];
  let batch = [];
  let rowCount = 0;

  
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


