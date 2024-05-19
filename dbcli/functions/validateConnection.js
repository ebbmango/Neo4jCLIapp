// Libraries
const isReachable = require("is-reachable");

// MAIN: This method makes sure the target database is reachable.
async function validateConnection() {
  const { default: chalk } = await import("chalk");

  const isDatabaseOnline = await isReachable("bolt://localhost:7687");

  if (!isDatabaseOnline) {

    // Builds error message.
    const errorHeader = chalk.bgRed(" ERROR: ");
    const errorMessage = chalk.red.bold("Connection to the database could not be established.");
    const command = chalk.yellow("dbcli connect")
    
    // Displays error message.
    console.log(`${errorHeader} ${errorMessage}\nMake sure to be running ${command} on the background.`);
    
    // Terminates the program.
    process.exit(0); // (*)
  }
}

module.exports = validateConnection;

// (*): Using process.exit(0) instead of throwing an error for better code readability and more precise chalking of the error message.