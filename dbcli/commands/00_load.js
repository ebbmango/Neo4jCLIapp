const command = {
  command: "load",
  describe:
    "Creates the database and loads it with the data provided by the CSV file passed as its argument.",
  // flags
  builder: (yargs) => {
    return yargs.option("path", {
      alias: "p",
      describe:
        "Searches for the CSV file in the location given by the informed path (as opposed to in the default import directory)",
      type: "boolean",
      default: false,
    });
  },
  // behavior
  handler: (argv) => {
    const args = argv._.slice(1);
    console.log(args);
  },
};

module.exports = command;
