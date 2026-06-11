const BASE = "/tasks";

export async function fetchTasks() {
  const res = await fetch(BASE);
  return res.json();
}

export async function createTask(data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateTask(id, changes) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  return res.json();
}

export async function deleteTask(id) {
  await fetch(`${BASE}/${id}`, { method: "DELETE" });
}
