const fs = require("fs");
const path = require("path");


function validateCSV(argv) {
  // Stows only the arguments (command name excluded) in an array.
  const arguments = argv._.slice(1);

  // Makes sure that the user has provided at least one argument to the command.
  if (arguments.length === 0) {
    throw new Error("Error: You must provide the pathname of the CSV file.");
  }

  // Retrieves the file path.
  const filePath = arguments[0];

  const importDirectory = path.resolve(__dirname, "../import");

  const fullPath = path.join(importDirectory, filePath);

  // Checks whether the file exists...
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File ${filePath} does not exist in the import directory.`);
  }

  return filePath;
}

module.exports = { validateCSV };
