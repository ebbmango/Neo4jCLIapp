const fs = require("fs");

function validateCSV(argv) {
  // Stows only the arguments (command name excluded) in an array.
  const arguments = argv._.slice(1);

  // Makes sure that the user has provided at least one argument to the command.
  if (arguments.length === 0) {
    throw new Error("Error: You must provide the pathname of the CSV file.");
  }

  // Retrieves the file path.
  const filePath = arguments[0];

  // Checks whether the file exists...
  if (!fs.existsSync(filePath)) {
    throw new Error(`File ${filePath} does not exist.`);
  }

  return true;
}

module.exports = { validateCSV };
