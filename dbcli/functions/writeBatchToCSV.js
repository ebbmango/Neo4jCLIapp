const fs = require("fs");

const writeBatchToCSV = (batch, batchIndex) => {
  return new Promise((resolve, reject) => {
    const tempFilePath = `batch_${batchIndex}.csv`;
    const stream = fs.createWriteStream(tempFilePath);

    stream.once("open", (fd) => {
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
