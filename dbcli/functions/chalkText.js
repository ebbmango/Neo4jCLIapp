// MAIN: This function chalks text marked using HTML-like language.
async function chalkText(input) {
  // Importing chalk
  const { default: chalk } = await import("chalk");

  // Regular expression used to identify the tags
  const tagPattern = /<(\w+)>(.*?)<\/\1>/g;

  // Dictionary used to relate a tag to a property of chalk
  const tagMap = {
    // modifiers
    reset: "reset",
    bold: "bold",
    dim: "dim",
    it: "italic",
    udln: "underline",
    ovln: "overline",
    inv: "inverse",
    hdn: "hidden",
    str: "strikethrough",
    vis: "visible",
    // colors
    blk: "black",
    red: "red",
    grn: "green",
    ylw: "yellow",
    blue: "blue",
    mgnt: "magenta",
    cyan: "cyan",
    wht: "white",
    // bright colors
    blkBr: "blackBright",
    redBr: "redBright",
    grnBr: "greenBright",
    ylwBr: "yellowBright",
    blueBr: "blueBright",
    mgntBr: "magentaBright",
    cyanBr: "cyanBright",
    whtBr: "whiteBright",
    // background colors
    BgBlk: "bgBlack",
    BgRed: "bgRed",
    BgGrn: "bgGreen",
    BgYlw: "bgYellow",
    BgBlue: "bgBlue",
    BgMgnt: "bgMagenta",
    BgCyan: "bgCyan",
    BgWht: "bgWhite",
    BgBlkBr: "bgBlackBright",
    BgRedBr: "bgRedBright",
    BgGrnBr: "bgGreenBright",
    BgYlwBr: "bgYellowBright",
    BgBlueBr: "bgBlueBright",
    BgMgntBr: "bgMagentaBright",
    BgCyanBr: "bgCyanBright",
    BgWhtBr: "bgWhiteBright",
  };

  let previousInput;

  // Replaces the found tags and their content with their chalked correspondances until no matches are found
  do {
    previousInput = input;
    input = input.replace(tagPattern, (match, tag, content) => {
      if (tag in tagMap) {
        return chalk[tagMap[tag]](content);
      }
      return match; // Returns the original match if the tag is not recognized
    });
  } while (input !== previousInput);

  return input;
}

module.exports = chalkText;
