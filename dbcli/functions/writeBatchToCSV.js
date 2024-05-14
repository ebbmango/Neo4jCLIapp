const fs = require("fs");
const path = require("path");

const writeBatchToCSV = (batch) => {
  return new Promise((resolve, reject) => {
    const importDir = path.resolve(__dirname, "../import");
    const tempFilePath = `${importDir}/temp_file.csv`;
    const stream = fs.createWriteStream(tempFilePath);

    stream.once("open", (fd) => {
      // Writing the headers
      stream.write("Category,Subcategory\n");
      // Writing each of the lines of information
      batch.forEach((row) => {
        stream.write(row.join(",") + "\n");
      });
      stream.end();
      stream.on("finish", () => {
        resolve(tempFilePath);
      });
      stream.on("error", (err) => {
        reject(err);
      });
    });
  });
};

module.exports = { writeBatchToCSV };
