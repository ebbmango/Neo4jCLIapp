const { spawn } = require("child_process");

const command = {
  command: "connect",
  describe: "Creates a Neo4J database and connects to it.",
  handler: async (argv) => {
    const dockerProcess = spawn("docker", [
      "run",
      "--publish=7474:7474",
      "--publish=7687:7687",
      "--env=NEO4J_AUTH=none",
      "neo4j:latest",
    ]);

    // Listen for stdout data
    dockerProcess.stdout.on("data", (data) => {
      console.log(data.toString("utf-8").split("INFO")[1].trim());
    });

    // Listen for stderr data
    dockerProcess.stderr.on("data", (data) => {
      console.error(data.toString("utf-8"));
    });

    // Listen for errors
    dockerProcess.on("error", (error) => {
      console.error(`Error spawning Docker process: ${error}`);
    });

    // Listen for process exit
    dockerProcess.on("close", (code) => {
      console.log(`Docker process exited with code ${code}`);
    });
  },
};

module.exports = command;
