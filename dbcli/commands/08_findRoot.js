// Libraries
const neo4j = require("neo4j-driver");

// Functions
const validateArguments = require("../functions/validateArguments");
const validateConnection = require("../functions/validateConnection");
const logsFullArray = require("../functions/logsFullArray");

// Queries
const { findRandomRoot: query } = require("../queries/cypherQueries");

const command = {
  command: "8",
  describe:
    "Finds a root node (i.e., one which is not a subcategory of any other node).",
  handler: async (argv) => {
    const { default: chalk } = await import("chalk");

    const arguments = argv._.slice(1); // Stows the received arguments to a dedicated variable.
    const argsLength = arguments.length; // Creates a handler for the length of the args array.
    
    // Ensures there is the exact amount of expected arguments. (*)
    if (argsLength > 1) {
      // Builds error message.
      const errorHeader = chalk.bgRed(" ERROR: ");
      const errorMessage = chalk.red.bold(`Received more arguments than expected.`);
      const expectedLine = `Expected: 0 or 1`;
      const receivedLine = `Received: ${argsLength} ${argsLength > 0 ? ` (${await stringify(arguments)})` : ""}`;
      // Displays error message.
      console.log(`${errorHeader} ${errorMessage}\n${expectedLine}\n${receivedLine}`);
      // Terminates the program.
      process.exit(0); // (**)
    }

    // Ensures a connection to the database could be established.
    await validateConnection(); 

    // Creates a handler for the relevant argument.
    const amount = argsLength === 0 ? 1 : arguments[0]; // If no argument is given, the amount of nodes returned will default to 1.

    // Ensures the argument is a numeric value.
    if (typeof amount !== 'number') {
      // Builds error message.
      const errorHeader = chalk.bgRed(" ERROR: ");
      const errorMessage = chalk.red.bold(`Received argument of wrong type.`);
      const expectedLine = `Expected: number`;
      const receivedLine = `Received: ${typeof amount}`;
      // Displays error message.
      console.log(`${errorHeader} ${errorMessage}\n${expectedLine}\n${receivedLine}`);
      // Terminates the program.
      process.exit(0); // (**)
    }

    // Starts the queries' runner.
    const driver = neo4j.driver("bolt://localhost:7687");
    const session = driver.session();

    try {
      // Runs the query.
      const randomNodes = await runQuery(session, { amount: neo4j.int(amount) });
      // Formats the result.
      const chalkAmount = chalk.bold(`${amount}`)
      const chalkTitle = chalk.bold(`root node${randomNodes.length === 1 ? "" : "s"}`);
      // Displays the result.
      console.log(`List of ${chalkAmount} randomly selected ${chalkTitle}:\n`);
      await logsFullArray(randomNodes);
    } catch (error) {
      console.error(error); // Handles errors.
    } finally {
      // Terminates the queries' runner.
      await session.close();
      await driver.close();
    }
  },
};

module.exports = command;

// Auxiliary function
const runQuery = async (session, queryParameters) => {
  const result = await session.run(query, queryParameters);
  return result.records.map((record) => record.get("root.name"));
};

module.exports = command;

// (*): This function – instead of the usual validateArguments() – is necessary because for this specific case,
// there are TWO amounts of arguments that can be accepted (instead of only one, which is the case for all other commands).

// (**): Using process.exit(0) instead of throwing an error for better code readability and more precise chalking of the error message. 