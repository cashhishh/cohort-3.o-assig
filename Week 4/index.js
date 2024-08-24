const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("counter")
  .description("CLI to perform file-based tasks")
  .version("0.8.0");

// Define the 'count' command
program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    // Read the file asynchronously
    fs.readFile(file, "utf8", (err, data) => {
      if (err) {
        console.error(`Error reading file: ${err.message}`);
        process.exit(1); // Exit the process with an error code
      } else {
        // Count the number of lines
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in ${file}`);
      }
    });
  });

// Parse the command-line arguments
program.parse(process.argv);
