// MAIN: This function converts time given in milliseconds to human readable form.
function msToString(milliseconds) {
  // Converts milliseconds to hours, minutes, seconds, and milliseconds.
  let hours = Math.floor(milliseconds / (1000 * 60 * 60));
  milliseconds %= 1000 * 60 * 60;
  let minutes = Math.floor(milliseconds / (1000 * 60));
  milliseconds %= 1000 * 60;
  let seconds = Math.floor(milliseconds / 1000);
  milliseconds %= 1000;

  // Formats the result.
  let result = "";
  if (hours > 0) result += `${hours.toString().padStart(2, "0")}h `;
  if (minutes > 0 || hours > 0)
    result += `${minutes.toString().padStart(2, "0")}m `;
  if (seconds > 0 || minutes > 0 || hours > 0)
    result += `${seconds.toString().padStart(2, "0")}s `;
  result += `${milliseconds.toString().padStart(3, "0")}ms`;
  return result.trim();
}

module.exports = msToString;
