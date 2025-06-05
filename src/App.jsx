import React, { useState } from "react";
import "./App.css";

function App() {
  // Initial hardcoded tasks
  const initialTasks = [
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Read a book", completed: true },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [newTitle, setNewTitle] = useState("");
  const [filter, setFilter] = useState("all"); // all | completed | pending

  // Add a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (newTitle.trim() === "") return; // validation
    const nextId =
      tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = { id: nextId, title: newTitle.trim(), completed: false };
    setTasks([newTask, ...tasks]);
    setNewTitle("");
  };

  // Toggle completion
  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter logic
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // 'all'
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      {/* Add Task Form */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Enter task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button type="submit" disabled={newTitle.trim() === ""}>
          Add
        </button>
      </form>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <button
          onClick={() => setFilter("all")}
          style={{
            marginRight: "8px",
            padding: "6px 12px",
            borderRadius: "4px",
            border: filter === "all" ? "2px solid #007bff" : "1px solid #ccc",
          }}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          style={{
            marginRight: "8px",
            padding: "6px 12px",
            borderRadius: "4px",
            border:
              filter === "completed" ? "2px solid #007bff" : "1px solid #ccc",
          }}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border:
              filter === "pending" ? "2px solid #007bff" : "1px solid #ccc",
          }}
        >
          Pending
        </button>
      </div>

      {/* Task List */}
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            <span
              className={`task-title ${task.completed ? "completed" : ""}`}
              onClick={() => toggleComplete(task.id)}
            >
              {task.title}
            </span>
            <div className="actions">
              <button
                className="complete-btn"
                onClick={() => toggleComplete(task.id)}
                title={task.completed ? "Mark as Pending" : "Mark as Completed"}
              >
                ✔︎
              </button>
              <button onClick={() => handleDelete(task.id)} title="Delete Task">
                🗑︎
              </button>
            </div>
          </li>
        ))}
        {filteredTasks.length === 0 && (
          <li style={{ textAlign: "center", color: "#666" }}>
            No tasks to display.
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;
