// external dependencies
const fs = require("fs");
const path = require("path");
const mime = require("mime-types");

// functions
const runQuery = require("../functions/runQuery");
const chalkText = require("../functions/chalkText");
const msToString = require("../functions/msToString");
const displayError = require("../yargs/displayError");
const runQueryWithSpinner = require("../functions/runQueryWithSpinner");

const {
  constraintsQuery,
  loadCategoriesQuery,
  loadRelationshipsQuery,
} = require("../queries/uploadQueries");

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
      await displayError(
        new Error(`File ${filePath} does not exist in the import directory.`)
      );
      process.exit();
    }

    if (mime.lookup(filePath) !== "text/csv") {
      await displayError(new Error(`File ${filePath} is not of CSV type.`));
      process.exit();
    }

    console.log(await chalkText("<ylw>⚠</ylw> CSV files that do not have exactly two columns per row may result in unexpected processing errors."))

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
  },
};

module.exports = command;
