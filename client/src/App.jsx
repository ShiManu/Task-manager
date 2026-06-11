import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import FilterBar from "./components/FilterBar";
import StatsBar from "./components/StatsBar";
import "./styles/app.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All"); // "All" | "Active" | "Completed"
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate(data) {
    try {
      const newTask = await createTask(data);
      setTasks((prev) => [newTask, ...prev]);
    } catch (err) {
      alert("Failed to create task. Is the server running?");
    }
  }

  async function handleToggle(task) {
    try {
      const updated = await updateTask(task.id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      alert("Failed to update task.");
    }
  }

  async function handleEdit(id, changes) {
    try {
      const updated = await updateTask(id, changes);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      alert("Failed to update task.");
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this task?");
    if (!confirmed) return;
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      alert("Failed to delete task.");
    }
  }

  // Apply filter and search
  const visibleTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "All" ||
      (filter === "Active" && !task.completed) ||
      (filter === "Completed" && task.completed);

    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Manager</h1>
        <StatsBar tasks={tasks} />
      </header>

      <main className="app-main">
        <TaskForm onCreate={handleCreate} />

        <div className="controls">
          <FilterBar active={filter} onChange={setFilter} />
          <input
            className="search-input"
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="status-msg">Loading...</p>
        ) : (
          <TaskList
            tasks={visibleTasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </main>
    </div>
  );
}
