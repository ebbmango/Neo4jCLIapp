async function displayError(errorObject) {
  const { default: chalk } = await import("chalk");

  // If the message possesses a ":", colorize the first and the second halves of the message differently
  const [firstHalf, secondHalf] = errorObject.message.split(":");
  let errorMessage = secondHalf
    ? `${chalk.red.bold(`${firstHalf}:`)}${secondHalf}`
    : chalk.red.bold(firstHalf);

  // Formats the message
  const errorTag = chalk.bgRed.black(" ERROR ");
  const tipTag = chalk.bgYellow.black("  TIP  ");

  // Displays the message
  console.log(`${errorTag} ${errorMessage}`);
  if (errorObject.tip) {
    console.log(`${tipTag} ${errorObject.tip}`);
  }
}

module.exports = displayError;
