#!/usr/bin/env node

const yargs = require("yargs");

// preliminary
const load = require("../commands/00_load.js");
const connect = require("../commands/00_connect.js");

// tasks
const findAllChildren = require("../commands/01_findChildren.js");
const countChildren = require("../commands/02_countChildren");
const findGrandchildren = require("../commands/03_findGrandchildren");
const findParents = require("../commands/04_findParents");
const countParents = require("../commands/05_countParents");
const findGrandparents = require("../commands/06_findGrandparents");
const countUnique = require("../commands/07_countUnique");
const findRoot = require("../commands/08_findRoot");
const findBarren = require("../commands/09_findBarren");
const findFertile = require("../commands/10_findFertile");
const renameNode = require("../commands/11_renameNode");
const findPaths = require("../commands/12_findPaths");

yargs
  // setup
  .command(load)
  .command(connect)
  // tasks
  .command(findAllChildren)
  .command(countChildren)
  .command(findGrandchildren)
  .command(findParents)
  .command(countParents)
  .command(findGrandparents)
  .command(countUnique)
  .command(findRoot)
  .command(findBarren)
  .command(findFertile)
  .command(renameNode)
  .command(findPaths)
  .help().argv;
