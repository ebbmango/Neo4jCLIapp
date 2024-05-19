// MAIN: This method makes sure the user has provided the exact amount of arguments that is expected.
async function validateArguments(arguments, expectedAmount) {
  const { default: chalk } = await import("chalk");

  const argsLength = arguments.length;

  if (arguments.length !== expectedAmount) {
  
    // Builds error message.
    const errorHeader = chalk.bgRed(" ERROR: ");
    const errorMessage = chalk.red.bold(`Received ${argsLength > expectedAmount ? "more" : "less"} arguments than expected.`);
    const expectedLine = `Expected: ${expectedAmount}`;
    const receivedLine = `Received: ${argsLength} ${argsLength > 0 ? ` (${await stringify(arguments)})` : ""}`;

    // Displays error message.
    console.log(`${errorHeader} ${errorMessage}\n${expectedLine}\n${receivedLine}`);

    // Terminates the program.
    process.exit(0); // (*)
  }
}

// Auxiliar function
const stringify = async (args) => {
  // This function builds and returns a string with every argument highlighted in yellow and joined by a comma.
  const { default: chalk } = await import("chalk");
  return args.map((arg) => {return chalk.yellow(`"${arg}"`);}).join(", ");
};

module.exports = validateArguments;

// (*): Using process.exit(0) instead of throwing an error for better code readability and more precise chalking of the error message. 