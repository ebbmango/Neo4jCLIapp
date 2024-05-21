const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const updateSpinner = require("../functions/updateSpinner");

const command = {
  command: "connect",
  describe: "Creates a Neo4J database and connects to it.",
  handler: async (argv) => {
    const { default: ora } = await import("ora"); // Spinner (loader) module

    const importDir = path.resolve(__dirname, "../import");

    // Get the current user ID and group ID
    const uid = os.userInfo().uid;
    const gid = os.userInfo().gid;

    const dockerProcess = spawn("docker", [
      "run",
      "--publish=7474:7474",
      "--publish=7687:7687",
      "--env=NEO4J_AUTH=none",
      "--env=NEO4J_apoc_export_file_enabled=true",
      "--env=NEO4J_apoc_import_file_enabled=true",
      "--env=NEO4J_apoc_import_file_use__neo4j__config=true",
      '--env=NEO4J_PLUGINS=["apoc"]',
      "--user",
      `${uid}:${gid}`,
      "-v",
      `${importDir}:/var/lib/neo4j/import`,
      "neo4j:5.19.0", // Specify the correct version as per your requirements
    ]);

    let spinner = ora("Setting up database connection").start(); // Initializes the spinner
    updateSpinner(spinner);

    // Listens for stdout data (and formats it adequately)
    dockerProcess.stdout.on("data", (data) => {
      const output = data.toString("utf-8");
      const infoParts = output.split("INFO");

      if (infoParts.length > 1) {
        // console.log(infoParts[1].trim());
        if (infoParts[1].includes("Remote interface available at")) {
          spinner.clear(); // Clears the spinner
          spinner.succeed("Database is ready to accept connections.");
          spinner.warn(
            "Keep this terminal open to prevent disconnection from the database. Open a separate instance for running commands."
          );
        }
      } else {
        // console.log(output.trim());
      }
    });

    // Listens for stderr data
    dockerProcess.stderr.on("data", (data) => {
      spinner?.clear(); // Clears the spinner
      spinner?.fail("Database connection failed.\n");
      spinner = null;

      console.error(data.toString("utf-8"));
    });

    // Listens for errors
    dockerProcess.on("error", (error) => {
      // spinner.clear(); // Clears the spinner
      console.error(`Error spawning Docker process: ${error}`);
    });

    // Listens for process exit
    dockerProcess.on("close", (code) => {
      console.log(`Docker process exited with code ${code}`);
    });
  },
};

module.exports = command;
