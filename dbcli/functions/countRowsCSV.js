const fs = require("fs");

function countRowsCSV(filePath) {
  return new Promise((resolve, reject) => {
    let rowCount = 0;
    fs.createReadStream(filePath)
      .on("data", (chunk) => {
        // Counting newlines to approximate the number of rows
        rowCount += chunk.toString().split("\n").length - 1;
      })
      .on("end", () => {
        resolve(rowCount);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

module.exports = { countRowsCSV };
