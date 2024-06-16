// External libraries
const path = require("path");

// Node modules
const fs = require("fs");

// MAIN: This method validates the filepath provided by the user.
function validateFilePath(filePath) {
  const importDirectory = path.resolve(__dirname, "../import");
  const fullPath = path.join(importDirectory, filePath);

  // Checks whether the file exists...
  if (!fs.existsSync(fullPath)) {
    // ...if it doesn't, throw an error.
    throw new Error(`File ${filePath} does not exist in the import directory.`);
  }

  // ...if it does, return it.
  return filePath;
}

module.exports = { validateFilePath };
