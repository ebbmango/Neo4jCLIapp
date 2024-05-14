const path = require("path");
const fs = require("fs");

function validateCSV(argv) {
  // Saving the path to the dedicated import folder
  const importDir = path.resolve(__dirname, "../import");

  // Stows only the arguments (command name excluded) in an array.
  const arguments = argv._.slice(1);

  // Makes sure that the user has provided at least one argument to the command.
  if (arguments.length === 0) {
    throw new Error("Error: You must provide the pathname of the CSV file.");
  }

  // Retrieves the file path informed by the user from the arguments array.
  const filePath = arguments[0];

  // Resolves the pathname given by the user inside of the import folder.
  const importPath = `${importDir}/${filePath}`;

  // Checks whether the file exists...
  if (!fs.existsSync(importPath)) {
    // If it doesn't, alert the user and halts the program.
    throw new Error(`File ${importPath} does not exist.`);
  }

  // If it does, return the path to it.
  return importPath;
}

module.exports = { validateCSV };
