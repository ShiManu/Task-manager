import { useState } from "react";
import "../styles/taskForm.css";

export default function TaskForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    onCreate({ title, description, dueDate: dueDate || null });

    // Reset form
    setTitle("");
    setDescription("");
    setDueDate("");
    setError("");
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>New Task</h2>

      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {error && <p className="form-error">{error}</p>}

      <input
        type="text"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">Add Task</button>
    </form>
  );
}
