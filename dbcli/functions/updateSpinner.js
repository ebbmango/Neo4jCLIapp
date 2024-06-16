function updateSpinner(spinner) {
  const colors = ["green", "yellow", "blue", "magenta", "cyan"];
  const dots = ["", ".", "..", "..."];

  let colorIndex = 0;
  let dotIndex = 0;

  setInterval(() => {
    // Updates color
    spinner.color = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
  }, 1000); // Every second

  setInterval(() => {
    // Updates dots
    spinner.text = spinner.text.replace(/[.]/g, "") + dots[dotIndex];
    dotIndex = (dotIndex + 1) % dots.length;
  }, 500); // Every second
}

module.exports = updateSpinner;
