const fs = require("fs");
const { parse } = require("csv-parse");

function prettifyRow(row) {
  return row.map((string) => {
    return string.replace(/_/g, " ");
  });
}

function batchesFromCSV(filePath, batches, totalRows, batchSize) {
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

module.exports = { batchesFromCSV };
