const os = require("os");
const path = require("path");
const { spawn } = require("child_process");

const command = {
  command: "connect",
  describe: "Creates a Neo4J database and connects to it.",
  handler: async (argv) => {
    const importDir = path.resolve(__dirname, "../import");
    console.log(importDir);

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
      "--user", `${uid}:${gid}`,
      "-v", `${importDir}:/var/lib/neo4j/import`,
      "neo4j:5.19.0", // Specify the correct version as per your requirements
    ]);

    // Listens for stdout data (and formats it adequately)
    dockerProcess.stdout.on("data", (data) => {
      const output = data.toString("utf-8");
      const infoParts = output.split("INFO");
      if (infoParts.length > 1) {
        console.log(infoParts[1].trim());
      } else {
        console.log(output.trim());
      }
    });

    // Listens for stderr data
    dockerProcess.stderr.on("data", (data) => {
      console.error(data.toString("utf-8"));
    });

    // Listens for errors
    dockerProcess.on("error", (error) => {
      console.error(`Error spawning Docker process: ${error}`);
    });
    
    // Listens for process exit
    dockerProcess.on("close", (code) => {
      console.log(`Docker process exited with code ${code}`);
    });
  },
};

module.exports = command;
