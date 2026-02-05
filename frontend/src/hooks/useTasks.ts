//frontend/src/hooks/useTasks.ts

import { useState, useEffect } from "react";
import { apiTasks } from "@/api/apiTasks";
import type { Task } from "@/types/task";
import { useNavigate } from "react-router-dom";

export function useTasks() {
  const navigate = useNavigate();

  // --- STATE ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [newTask, setNewTask] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const [showSettings, setShowSettings] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  // --- LOAD TASKS ---
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

  // --- ADD TASK ---
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

  // --- DELETE TASK ---
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

  // --- START EDIT ---
  function startEdit(task: Task) {
    setEditingId(task.id);
    setEditingText(task.title);
  }

  // --- CANCEL EDIT ---
  function cancelEdit() {
    setEditingId(null);
    setEditingText("");
  }

  // --- SAVE EDIT ---
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

  // --- TOGGLE COMPLETED ---
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

  // --- LOGOUT ---
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  // --- FILTERED TASKS ---
  const filteredTasks = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  // --- INITIAL LOAD ---
  useEffect(() => {
    loadTasks();
  }, []);

  return {
    // state
    tasks,
    loading,
    error,
    newTask,
    editingId,
    editingText,
    showSettings,
    filter,
    filteredTasks,

    // setters
    setNewTask,
    setShowSettings,
    setFilter,
    setEditingText,

    // actions
    loadTasks,
    addTask,
    deleteTask,
    startEdit,
    cancelEdit,
    saveTask,
    toggleCompleted,
    handleLogout,
  };
}
