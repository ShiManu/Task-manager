const fs = require("fs");
const path = require("path");

const FILE_PATH = path.join(__dirname, "tasks.json");

// Read tasks from JSON file; return empty array if file doesn't exist
function readTasks() {
  if (!fs.existsSync(FILE_PATH)) return [];
  const raw = fs.readFileSync(FILE_PATH, "utf-8");
  return JSON.parse(raw);
}

// Write tasks array to JSON file
function writeTasks(tasks) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}

module.exports = { readTasks, writeTasks };
