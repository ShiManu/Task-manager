require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { getAllTasks, insertTask, updateTaskById, deleteTaskById } = require("./storage");
const { createTask, updateTask } = require("./taskHelpers");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/health", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json({ status: "ok", taskCount: tasks.length, supabaseUrl: (process.env.SUPABASE_URL || "").replace(/\/rest\/v1\/?$/, "") });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description, dueDate } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const task = createTask({ title, description, dueDate });
    const created = await insertTask(task);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const updated = await updateTaskById(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await deleteTaskById(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
