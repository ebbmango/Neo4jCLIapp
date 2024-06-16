const findAllChildren = require("./01_findChildren.js");
const countChildren = require("./02_countChildren.js");
const findGrandchildren = require("./03_findGrandchildren.js");
const findParents = require("./04_findParents.js");
const countParents = require("./05_countParents.js");
const findGrandparents = require("./06_findGrandparents.js");
const countUnique = require("./07_countUnique.js");
const findRoot = require("./08_findRoot.js");
const findFertile = require("./09_findFertile.js");
const findBarren = require("./10_findBarren.js");
const renameNode = require("./11_renameNode.js");
const findPaths = require("./12_findPaths.js");

const commands = {
  findAllChildren,
  countChildren,
  findGrandchildren,
  findParents,
  countParents,
  findGrandparents,
  countUnique,
  findRoot,
  findFertile,
  findBarren,
  renameNode,
  findPaths,
};

module.exports = commands;
