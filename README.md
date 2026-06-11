# Task Manager

A simple single-user to-do app where you can create, view, edit, and delete tasks. Tasks can have an optional description and due date, be toggled complete/incomplete, and are filtered by status. Overdue tasks are visually highlighted. Data persists in **Supabase** so it survives server restarts and redeploys.

---

## Live Demo

- **Frontend (Vercel):** [https://task-manager-nu-black-18.vercel.app/](https://task-manager-nu-black-18.vercel.app/)
- **Backend API (Render):** [https://task-manager-wmsu.onrender.com/](https://task-manager-wmsu.onrender.com/tasks)

---

## Tech Stack

| Tool | Why |
|---|---|
| **Node.js + Express** | Minimal, easy to read REST API |
| **React + Vite** | Fast dev server, simple functional components |
| **Plain CSS** | No dependencies, straightforward to follow |
| **Supabase** | Cloud-hosted PostgreSQL — free tier, data persists across deploys |
| **UUID** | Reliable unique IDs for tasks |
| **dotenv** | Loads environment variables from `.env` file |
| **CORS** | Allows the frontend (Vercel) to call the backend (Render) |

---

## How to Run Locally

**Prerequisites:** Node.js installed, and a [Supabase](https://supabase.com) account (free tier).

### 1. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run:

```sql
CREATE TABLE tasks (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  "dueDate" TEXT,
  completed BOOLEAN DEFAULT FALSE,
  "createdAt" TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tasks DISABLE ROW LEVEL SECURITY;
```

3. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**.

### 2. Configure environment variables

```bash
cd server
echo "SUPABASE_URL=your-project-url" > .env
echo "SUPABASE_ANON_KEY=your-anon-key" >> .env
```

### 3. Start the backend

```bash
cd server
npm install
npm start
```

Server runs at `http://localhost:3001`.

### 4. Start the frontend

Open a second terminal:

```bash
cd client
npm install
npm start
```

Open `http://localhost:3000` in your browser.

---

## API Documentation

All responses are JSON. Tasks are sorted newest-first.

### `GET /tasks`
Returns all tasks.

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs",
    "dueDate": "2025-06-20",
    "completed": false,
    "createdAt": "2025-06-10T10:00:00.000Z"
  }
]
```

---

### `POST /tasks`
Create a new task.

**Body:**
```json
{ "title": "Buy groceries", "description": "Milk, eggs", "dueDate": "2025-06-20" }
```

`title` is required. `description` and `dueDate` are optional.

**Response:** `201` with the created task object.

---

### `PUT /tasks/:id`
Update one or more fields of a task.

**Body (any subset):**
```json
{ "title": "New title", "completed": true, "dueDate": "2025-07-01" }
```

**Response:** The updated task object.

---

### `DELETE /tasks/:id`
Delete a task.

**Response:**
```json
{ "message": "Task deleted" }
```

---

## Project Structure

```
task-manager/
├── server/
│   ├── index.js          # Express app, route handlers, async/await
│   ├── storage.js        # Supabase client — read/write to cloud DB
│   ├── taskHelpers.js    # createTask() and updateTask() logic
│   ├── .env.example      # Environment variable template
│   └── package.json
│
└── client/
    ├── index.html
    ├── vite.config.js    # Dev proxy: /tasks → localhost:3001
    └── src/
        ├── main.jsx      # React entry point
        ├── App.jsx       # Root component, state, filters, search
        ├── api.js        # All fetch() calls to backend
        ├── utils.js      # isOverdue(), formatDate()
        ├── components/
        │   ├── TaskForm.jsx    # Create task form
        │   ├── TaskList.jsx    # Renders list or empty state
        │   ├── TaskItem.jsx    # Single task (view + inline edit)
        │   ├── FilterBar.jsx   # All / Active / Completed tabs
        │   └── StatsBar.jsx    # Active vs completed counts
        └── styles/
            ├── global.css
            ├── app.css
            ├── taskForm.css
            ├── taskList.css
            ├── taskItem.css
            ├── filterBar.css
            └── statsBar.css
```

---

## Next Steps

- Authentication / multi-user support
- Drag-and-drop reordering
- Categories / tags

**What I'd build next:**
- **Priorities** — add a `priority` field (low / medium / high) with colour coding
- **Due-date reminders** — browser notifications for upcoming tasks
- **Pagination** — load tasks in batches as the list grows
