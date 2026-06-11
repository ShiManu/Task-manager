const { v4: uuidv4 } = require("uuid");

// Build a fresh task object from user input
function createTask({ title, description = "", dueDate = null }) {
  return {
    id: uuidv4(),
    title: title.trim(),
    description: description.trim(),
    dueDate: dueDate || null,
    completed: false,
    createdAt: new Date().toISOString(),
  };
}

// Merge allowed fields onto an existing task
function updateTask(existing, changes) {
  const allowed = ["title", "description", "dueDate", "completed"];

  const updated = { ...existing };
  for (const key of allowed) {
    if (key in changes) {
      updated[key] = changes[key];
    }
  }

  return updated;
}

module.exports = { createTask, updateTask };
