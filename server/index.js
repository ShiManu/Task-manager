const express = require("express");
const cors = require("cors");
const { readTasks, writeTasks } = require("./storage");
const { createTask, updateTask } = require("./taskHelpers");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// GET /tasks - return all tasks sorted newest first
app.get("/tasks", (req, res) => {
  const tasks = readTasks();
  const sorted = [...tasks].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  res.json(sorted);
});

// POST /tasks - create a new task
app.post("/tasks", (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title is required" });
  }

  const tasks = readTasks();
  const newTask = createTask({ title, description, dueDate });
  tasks.push(newTask);
  writeTasks(tasks);

  res.status(201).json(newTask);
});

// PUT /tasks/:id - update a task's fields
app.put("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[index] = updateTask(tasks[index], req.body);
  writeTasks(tasks);

  res.json(tasks[index]);
});

// DELETE /tasks/:id - delete a task
app.delete("/tasks/:id", (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks.splice(index, 1);
  writeTasks(tasks);

  res.json({ message: "Task deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
