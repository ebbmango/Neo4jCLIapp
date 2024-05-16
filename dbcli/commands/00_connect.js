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
      "--user", `${uid}:${gid}`,
      "-v", `${importDir}:/var/lib/neo4j/import`,
      "-e NEO4J_dbms_memory_heap_initial__size=4G",
      "-e NEO4J_dbms_memory_heap_max__size=4G",
      "neo4j:latest",
    ]);

    // Listens for stdout data (and formats it adequately)
    dockerProcess.stdout.on("data", (data) => {
      console.log(data.toString("utf-8").split("INFO")[1].trim());
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
