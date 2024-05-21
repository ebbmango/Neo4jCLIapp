// functions
const { validateFilePath } = require("../functions/validateFilePath");
const { loadDataFromCSV } = require("../functions/loadDataFromCSV");

// command
const command = {
  command: "load",
  describe:
    "Loads the database with the data provided by the CSV file passed as its argument.",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const arguments = argv._.slice(1); // Stows the received arguments to a dedicated variable.

    let filePath = arguments[0];

    try {
      filePath = validateFilePath(filePath); // Checks whether the user has provided a valid file path
    } catch (error) {
      // If the file path is not valid...
      console.error(error.message); // Informs the user.
      return false; // And halts program execution
    }

    await loadDataFromCSV(filePath); // Loads the data from the file onto the database.

    // Informs the user of the task's completion.
    console.log(
      chalk.green.bold(
        "✔ Database has been successfully filled with data from the CSV file."
      )
    );

        // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
        process.exit();
  },
};

module.exports = command;
