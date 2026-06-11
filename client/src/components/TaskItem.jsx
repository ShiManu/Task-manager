import { useState } from "react";
import { isOverdue, formatDate } from "../utils";
import "../styles/taskItem.css";

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  function handleSave() {
    if (!title.trim()) return;
    onEdit(task.id, { title, description, dueDate: dueDate || null });
    setEditing(false);
  }

  function handleCancel() {
    // Reset to original values
    setTitle(task.title);
    setDescription(task.description);
    setDueDate(task.dueDate || "");
    setEditing(false);
  }

  const overdue = isOverdue(task);

  // Build class list for the task card
  let cardClass = "task-item";
  if (task.completed) cardClass += " completed";
  if (overdue) cardClass += " overdue";

  return (
    <li className={cardClass}>
      {editing ? (
        <div className="task-edit">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title *"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="task-actions">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel} className="secondary">Cancel</button>
          </div>
        </div>
      ) : (
        <div className="task-view">
          <div className="task-left">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task)}
            />
            <div className="task-text">
              <span className="task-title">{task.title}</span>
              {task.description && (
                <span className="task-desc">{task.description}</span>
              )}
              {task.dueDate && (
                <span className={`task-due ${overdue ? "overdue-label" : ""}`}>
                  {overdue ? "⚠ Overdue: " : "Due: "}
                  {formatDate(task.dueDate)}
                </span>
              )}
            </div>
          </div>
          <div className="task-actions">
            <button onClick={() => setEditing(true)} className="secondary">Edit</button>
            <button onClick={() => onDelete(task.id)} className="danger">Delete</button>
          </div>
        </div>
      )}
    </li>
  );
}
