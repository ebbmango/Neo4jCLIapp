// functions
const { validateCSV } = require("../functions/validateCSV");
const { uploadCSV } = require("../functions/uploadCSV");

// command
const command = {
  command: "load",
  describe:
    "Loads the database with the data provided by the CSV file passed as its argument.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

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

    console.log(
      chalk.green.bold(
        "✔ Database has been successfully filled with data from the CSV file."
      )
    );
    
    process.exit(0);
  },
};

module.exports = command;
