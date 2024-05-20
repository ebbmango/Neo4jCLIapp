// Libraries
const isReachable = require("is-reachable");

async function checkConnection(argv) {
  const { default: chalk } = await import("chalk");
  
  const isDatabaseOnline = await isReachable("bolt://localhost:7687");

  const command = argv._[0];

  if (isDatabaseOnline || command === "connect") return true;

  const errorObject = new Error("Connection to the database could not be established");
  const tipMessage = `Make sure to be running ${chalk.yellow("dbcli connect")} on the background`;
  Object.assign(errorObject, { tip: tipMessage });

  throw errorObject;
}

module.exports = checkConnection;