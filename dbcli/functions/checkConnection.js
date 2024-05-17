const isReachable = require("is-reachable");

async function checkConnection() {
  const { default: chalk } = await import("chalk");

  const isDatabaseOnline = await isReachable("bolt://localhost:7687");

  if (!isDatabaseOnline) {
    const errorHeader = chalk.bgRed(" ERROR: ");
    const errorMessage = chalk.red.bold("Connection to the database could not be established.");
    const command = chalk.yellow("dbcli connect")

    console.log(`${errorHeader} ${errorMessage}\nMake sure to be running ${command} on the background.`);
    process.exit(0);
  }
}

module.exports = checkConnection;
