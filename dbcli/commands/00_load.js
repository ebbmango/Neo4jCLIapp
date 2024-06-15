// functions
const { validateFilePath } = require("../functions/validateFilePath");
const { loadDataFromCSV } = require("../functions/loadDataFromCSV");
const msToString = require("../functions/msToString");
const chalkText = require("../functions/chalkText");
const runQueryWithSpinner = require("../functions/runQueryWithSpinner");
const runQuery = require("../functions/runQuery");
const fs = require("fs");
const {
  constraintsQuery,
  loadCategoriesQuery,
  loadRelationshipsQuery,
} = require("../queries/uploadQueries");
const displayError = require("../yargs/displayError");
const path = require("path");

// command
const command = {
  command: "load <file_path>",
  describe:
    "Loads the database with the data provided by the CSV file passed as its argument.",
  handler: async (argv) => {
    const filePath = argv["file_path"]; // Creates a handler for the relevant argument.

    const importDirectory = path.resolve(__dirname, "../import");
    const fullPath = path.join(importDirectory, filePath.toString());

    if (!fs.existsSync(fullPath)) {
      displayError(
        new Error(`File ${filePath} does not exist in the import directory.`)
      );
    } else {
      const startTime = performance.now();

      // Sets up constraints.
      await runQuery(constraintsQuery, {});

      try {
        // Loads all categories from the CSV file into the database.
        await runQueryWithSpinner({
          query: loadCategoriesQuery,
          queryParameters: { filePath: `file:///${filePath}` },
          loadingText: "Loading Nodes",
          successText: "Nodes loaded successfully.",
          errorText: "Loading categories failed.",
        });

        // Creates relationships between categories and subcategories according to the CSV file.
        await runQueryWithSpinner({
          query: loadRelationshipsQuery,
          queryParameters: { filePath: `file:///${filePath}` },
          loadingText: "Loading Relationships",
          successText: "Relationships loaded successfully.",
          errorText: "Loading relationships failed.",
        });

        const endTime = performance.now();

        // Informs the user of the task's completion.
        console.log(
          await chalkText(
            "<bold><grn>✔ Database has been successfully filled with data from the CSV file.</grn></bold>"
          )
        );

        console.log(
          await chalkText(
            `\nElapsed time: <ylw>${msToString(endTime - startTime)}</ylw>`
          )
        );
      } catch (error) {
        console.log(
          await chalkText(
            "<bold><red>✖ Could not load data from the file.</red></bold>"
          )
        );
        console.error(error);
      } finally {
        // Manually exits the process (as it sometimes hangs, needlessly occupying the terminal).
        process.exit();
      }
    }
  },
};

module.exports = command;
