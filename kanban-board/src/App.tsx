import { useState } from "react";
import "./App.css";

const columns = ["todo", "in-progress", "completed"];

function App() {
  const addTask = () => {};

  const moveTask = (id, direction) => {};

  const deleteTask = (id) => {};

  const saveTitle = (id) => {};

  return (
    <div>
      <h2>Kanban Board</h2>
      <input
        data-testid="task-input"
        placeholder="Enter task"
        className="inputBox"
      />
      <button data-testid="add-task-button" className="addTaskBtn">
        Add Task
      </button>
      <div className="kanban-board">
        {columns.map((col) => (
          <div key={col} className="column" data-testid={`column-${col}`}>
            <h4>{col.replace("-", " ").toUpperCase()}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
