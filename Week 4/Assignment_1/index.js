#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const program = new Command();

program.name("mycli").description("A simple CLI tool").version("1.0.0");

program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    const filePath = path.resolve(file);

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      } else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${filePath}`);
      }
    });
  });
program
  .command("Replace")
  .description("Replace the text of file")
  .argument("<file>", "file to modify")
  .argument("<content>", "new content to write to the file")
  .action((file, content) => {
    const filePath = path.resolve(file);
    fs.writeFile(filePath, content, "utf-8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1);
      } else {
        console.log(`Replaced content of ${filePath}`);
      }
    });
  });

program.parse(process.argv);
