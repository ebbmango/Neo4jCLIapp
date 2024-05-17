async function checkArguments(arguments, expectedAmount) {
  const { default: chalk } = await import("chalk");

  const argsLength = arguments.length;

  if (arguments.length !== expectedAmount) {
    const errorHeader = chalk.bgRed(" ERROR: ");

    const errorMessage = chalk.red.bold(
      `Received ${
        argsLength > expectedAmount ? "more" : "less"
      } arguments than expected.`
    );

    const expectedLine = `Expected: ${expectedAmount}`;

    const receivedLine = `Received: ${argsLength} ${
      argsLength > 0 ? ` (${await stringify(arguments)})` : ""
    }`;

    console.log(
      `${errorHeader} ${errorMessage}\n${expectedLine}\n${receivedLine}`
    );

    process.exit(0);
  }
}

// auxiliar function
const stringify = async (args) => {
  const { default: chalk } = await import("chalk");
  return args
    .map((arg) => {
      return chalk.yellow(`"${arg}"`);
    })
    .join(", ");
};

module.exports = checkArguments;
