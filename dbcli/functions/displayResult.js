const chalkText = require("./chalkText");
const logsFullArray = require("./logsFullArray");

async function displayResult({ executionTime, header, data }) {
  // Explains retrieved data
  console.log(await chalkText(header));

  // Displays retrieved data
  if (data) {
    if (Array.isArray(data)) {
      await logsFullArray(data);
    } else {
      console.log(await chalkText(data));
    }
  }

  // Displays execution time
  const timeInSeconds = (executionTime / 1000).toFixed(4);
  console.log(
    await chalkText(`\nExecution time: <ylw>${timeInSeconds}</ylw> seconds`)
  );
}

module.exports = displayResult;
