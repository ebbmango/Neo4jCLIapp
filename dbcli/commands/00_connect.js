const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const updateSpinner = require("../functions/updateSpinner");
const isReachable = require("is-reachable");

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

    const checkDatabaseConnection = async () => {
      const reachable = await isReachable("localhost:7474");
      return reachable;
    };

    // Listens for stdout data (and formats it adequately)
    dockerProcess.stdout.on("data", (data) => {
      const output = data.toString("utf-8");
      const infoParts = output.split("INFO");

      if (infoParts.length > 1) {
        if (infoParts[1].includes("Remote interface available at")) {
          spinner.clear(); // Clears the spinner
          spinner.succeed("Database is ready to accept connections.");
          spinner.warn(
            "Keep this terminal open to prevent disconnection from the database. Open a separate instance for running commands."
          );
        }
      }
    });

    const checkInterval = setInterval(async () => {
      const isConnected = await checkDatabaseConnection();
      if (isConnected) {
        clearInterval(checkInterval);
        spinner.clear(); // Clears the spinner
        spinner.succeed("Database is ready to accept connections.");
        spinner.warn(
          "Keep this terminal open to prevent disconnection from the database. Open a separate instance for running commands.\n"
        );
      }
    }, 2500); // Check every 2.5 seconds

    // Listens for stderr data
    dockerProcess.stderr.on("data", (data) => {
      clearInterval(checkInterval);
      spinner?.clear(); // Clears the spinner

      const output = data.toString("utf-8");

      // If the failure is due to the port already being allocated:
      if (output.includes("port is already allocated")) {
        spinner.clear();
        spinner.fail(
          "Database connection failed: Port 7687 is already allocated."
        );
        spinner.warn(
          "Double-check whether no other database instance is already online.\n"
        );
      } else {
        spinner.clear();
        spinner.fail("Database connection failed.");
        spinner.warn(
          "Make sure to have Docker Desktop running in the background.\n"
        );
      }

      spinner = null;
    });

    // Listens for errors
    dockerProcess.on("error", (error) => {
      console.error(`Error spawning Docker process: ${error}`);
    });

    // Listens for process exit
    dockerProcess.on("close", (code) => {
      console.log(`Docker process exited with code ${code}`);
      process.exit();
    });
  },
};

module.exports = command;
