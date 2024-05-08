#!/usr/bin/env node

const yargs = require("yargs");

yargs
  .command({
    command: "1",
    describe: "Finds all children of a given node.",
    handler: (argv) => {
      console.log("Task 01 - Work in progress");
    },
  })

  .command({
    command: "2",
    describe: "Counts all children of a given node.",
    handler: (argv) => {
      console.log("Task 02 - Work in progress");
    },
  })
  .command({
    command: "3",
    describe: "Finds all grandchildren of a given node.",
    handler: (argv) => {
      console.log("Task 03 - Work in progress");
    },
  })
  .command({
    command: "4",
    describe: "Finds all parents of a given node.",
    handler: (argv) => {
      console.log("Task 04 - Work in progress");
    },
  })
  .command({
    command: "5",
    describe: "Counts all parents of a given node.",
    handler: (argv) => {
      console.log("Task 05 - Work in progress");
    },
  })
  .command({
    command: "6",
    describe: "Finds all grand parents of a given node.",
    handler: (argv) => {
      console.log("Task 06 - Work in progress");
    },
  })
  .command({
    command: "7",
    describe: "Counts how many uniquely named nodes there are.",
    handler: (argv) => {
      console.log("Task 07 - Work in progress");
    },
  })
  .command({
    command: "8",
    describe:
      "Finds a root node (i.e., one which is not a subcategory of any other node).",
    handler: (argv) => {
      console.log("Task 08 - Work in progress");
    },
  })
  .command({
    command: "9",
    describe:
      "Finds the nodes with the most children (there could be more than one).",
    handler: (argv) => {
      console.log("Task 09 - Work in progress");
    },
  })
  .command({
    command: "10",
    describe:
      "Finds the nodes with the least children (there could be more than one). Childless nodes are not considered.",
    handler: (argv) => {
      console.log("Task 10 - Work in progress");
    },
  })
  .command({
    command: "11",
    describe: "Renames a given node.",
    handler: (argv) => {
      console.log("Task 11 - Work in progress");
    },
  })
  .command({
    command: "12",
    describe:
      "Finds all paths between two given nodes, with directed edges from the first to the second node.",
    handler: (argv) => {
      console.log("Task 12 - Work in progress");
    },
  })
  .help().argv;
