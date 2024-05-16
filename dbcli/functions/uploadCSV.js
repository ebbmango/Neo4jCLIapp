const neo4j = require("neo4j-driver");

const {
  setUpConstraints,
  loadCategories,
  loadRelationships,
} = require("./cypherQueries");

async function uploadCSV(filePath) {
  const { default: ora } = await import("ora");

  const driver = neo4j.driver("bolt://localhost:7687");
  const session = driver.session();

  try {
    // Clears existing data (in case the user restarts a docker container instead of using the "connect" command).
    await session.run("MATCH (n) DETACH DELETE n");

    // Sets up constraints.
    await setUpConstraints(session);

    // Loads categories and subcategories as "Category" nodes.
    const nodeSpinner = ora("Loading Nodes").start();
    updateSpinner(nodeSpinner);
    await loadCategories(session, filePath);
    nodeSpinner.clear()
    nodeSpinner.succeed('Nodes loaded successfully.');
    
    // Creates relationships between categories and subcategories.
    const relSpinner = ora("Loading Relationships").start();
    updateSpinner(relSpinner);
    await loadRelationships(session, filePath);
    relSpinner.clear()
    relSpinner.succeed('Relationships loaded successfully.');
  } catch (error) {
    console.error("Error processing CSV file:", error);
  } finally {
    await session.close();
    await driver.close();
  }
}

module.exports = { uploadCSV };

function updateSpinner(spinner) {
  const colors = ["green", "yellow", "blue", "magenta", "cyan"];
  const dots = ["", ".", "..", "..."];

  let dotIndex = 0;

  setInterval(() => {
    // Updates color
    spinner.color = colors[nextIndex(colors, spinner.color)];

    // Updates dots
    spinner.text = spinner.text.replace(/[.]/g, "") + dots[dotIndex];
    dotIndex = (dotIndex + 1) % dots.length;
      
  }, 1000);
}

function nextIndex(array, element) {
  return (array.findIndex(e => e === element) + 1) % array.length;
}
