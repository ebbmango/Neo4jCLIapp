const fs = require("fs");

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

module.exports = { checkFileExists };
