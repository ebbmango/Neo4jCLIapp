const chalkText = require("./chalkText");
const logsFullArray = require("./logsFullArray");

async function displayResult({ executionTime, header, data }) {

  // Displays execution time
  const timeInSeconds = (executionTime / 1000).toFixed(4);
  console.log(await chalkText(`Execution time: <ylw>${timeInSeconds}</ylw> seconds`));

  // Explains retrieved data
  console.log(await chalkText(header));

  // Displays retrieved data
  if (Array.isArray(data)) {
    logsFullArray(data)
  } else {
    console.log(await chalkText(data))
  }
}

module.exports = displayResult;
