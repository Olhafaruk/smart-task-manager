// src/pages/Tasks.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiTasks } from "../apiTasks";
import SettingsPanel from "../components/SettingsPanel";
import { useTheme } from "../context/useTheme";
import { themeStyles } from "../themeStyles";


export type Task = {
    id: number;
    title: string;
    completed: boolean;
};

export default function Tasks() {
  const navigate = useNavigate();
  const { themeStyle } = useTheme();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const [showSettings, setShowSettings] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  async function loadTasks() {
    setLoading(true);
    setError("");

    try {
      const response = await apiTasks("/tasks/");
      if (!response.ok) {
        setError("Failed to load tasks");
        return;
      }

      const data = await response.json();
      setTasks(data);
    } catch {
      setError("Server connection error");
    } finally {
      setLoading(false);
    }
  }

  async function addTask() {
    setError("");

    if (!newTask.trim()) {
      setError("Task cannot be empty");
      return;
    }

    try {
      const response = await apiTasks("/tasks/", {
        method: "POST",
        body: JSON.stringify({ title: newTask }),
      });

      if (!response.ok) {
        setError("Failed to add task");
        return;
      }

      setNewTask("");
      loadTasks();
    } catch {
      setError("Server connection error");
    }
  }

  async function deleteTask(id: number) {
    setError("");

    try {
      const response = await apiTasks(`/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setError("Failed to delete task");
        return;
      }

      loadTasks();
    } catch {
      setError("Server connection error");
    }
  }

  function startEdit(task: Task) {
    setEditingId(task.id);
    setEditingText(task.title);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  async function saveTask(id: number) {
    setError("");

    if (!editingText.trim()) {
      setError("Task cannot be empty");
      return;
    }

    try {
      const response = await apiTasks(`/tasks/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title: editingText }),
      });

      if (!response.ok) {
        setError("Failed to update task");
        return;
      }

      setEditingId(null);
      setEditingText("");
      loadTasks();
    } catch {
      setError("Server connection error");
    }
  }

  async function toggleCompleted(task: Task) {
    setError("");

    try {
      const response = await apiTasks(`/tasks/${task.id}`, {
        method: "PUT",
        body: JSON.stringify({ completed: !task.completed }),
      });

      if (!response.ok) {
        setError("Failed to update task");
        return;
      }

      loadTasks();
    } catch {
      setError("Server connection error");
    }
  }

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  useEffect(() => {
    loadTasks();
  }, []);


  const filteredTasks = tasks.filter((t: Task) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Tasks</h1>

        <div className="flex items-center gap-4">
          {/* Settings icon */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="text-white hover:text-blue-400"
            title="Settings"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v2m0 12v2m8-8h2M4 12H2m15.364-6.364l1.414 1.414M6.222 17.778l-1.414-1.414M17.778 17.778l-1.414-1.414M6.222 6.222L4.808 7.636"
              />
            </svg>
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && <SettingsPanel />}

      {/* Error message */}
      {error && (
        <div className="bg-red-600 text-white p-2 rounded mb-4 text-center">
          {error}
        </div>
      )}

      {/* Add Task */}
      <div className={`${themeStyles[themeStyle].card} p-6 rounded-lg shadow-lg mb-6`}>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="New task..."
            className="flex-1 p-2 rounded bg-slate-700 border border-slate-600"
          />

          <button
            onClick={addTask}
            className={`${themeStyles[themeStyle].button} px-4 py-2`}
          >
            Add
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-600" : "bg-slate-700"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${
            filter === "active" ? "bg-blue-600" : "bg-slate-700"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed" ? "bg-blue-600" : "bg-slate-700"
          }`}
        >
          Completed
        </button>
      </div>

      {/* Task List */}
      <div className={`${themeStyles[themeStyle].card} p-6 rounded-lg shadow-lg`}>
        {filteredTasks.length === 0 ? (
          <p className="text-slate-400">No tasks found.</p>
        ) : (
          <ul className="space-y-3">
            {filteredTasks.map((task) => (
              <li
                key={task.id}
                className={`${themeStyles[themeStyle].card} p-3 rounded flex justify-between items-center gap-3`}
              >
                {/* Completed checkbox with tooltip */}
                <div className="relative group flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleCompleted(task)}
                    className="h-5 w-5 cursor-pointer"
                  />

                  <div
                    className="
                      absolute -top-8 left-1/2 -translate-x-1/2
                      whitespace-nowrap
                      bg-black text-white text-xs px-2 py-1 rounded
                      opacity-0 group-hover:opacity-100
                      transition-opacity duration-200
                      pointer-events-none
                      shadow-lg
                    "
                  >
                    {task.completed
                      ? "Unmark as completed"
                      : "Mark as completed"}
                  </div>
                </div>

                {/* Task text */}
                <div className="flex-1">
                  {editingId === task.id ? (
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full p-2 rounded bg-slate-600 border border-slate-500"
                    />
                  ) : (
                    <span
                      className={
                        task.completed
                          ? "line-through text-slate-400"
                          : ""
                      }
                    >
                      {task.title}
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  {editingId === task.id ? (
                    <>
                      <button
                        onClick={() => saveTask(task.id)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-slate-500 hover:bg-slate-600 px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(task)}
                        className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
