// functions
const { validateCSV } = require("../functions/validateCSV");
const { uploadCSV } = require("../functions/uploadCSV");

// command
const command = {
  command: "load",
  describe:
    "Loads the database with the data provided by the CSV file passed as its argument.",
  handler: async (argv) => {
    let filePath;

    try {
      filePath = validateCSV(argv); // Checks whether the user has provided a valid file path
      console.log("file has been found in the directory");
    } catch (error) {
      // If an error occurs...
      console.error(error.message); // Informs the user
      return false; // And halts program execution
    }

    await uploadCSV(filePath);
  },
};

module.exports = command;
