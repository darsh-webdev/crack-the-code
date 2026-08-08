import { useRef, useState } from "react";
import "./App.css";

// Sample initial data
type Task = {
  id: string;
  label: string;
};

const initialData: Record<string, Task[]> = {
  todo: [
    { id: "task-1", label: "Task 1" },
    { id: "task-2", label: "Task 2" },
  ],
  "in progress": [{ id: "task-3", label: "Task 3" }],
  done: [{ id: "task-4", label: "Task 4" }],
};

function App() {
  const [columns, setColumns] = useState(initialData);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskLabel, setEditingTaskLabel] = useState("");
  const [isAddingNewTask, setIsAddingNewTask] = useState(false);
  const [newTaskInputLabel, setNewTaskInputLabel] = useState("");
  const enterBtnRef = useRef(false);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (columnId: string) => {
    if (!draggedTask) return;
    setColumns((prev) => {
      // Remove task from its original column
      const newColumns = { ...prev };
      for (const col in newColumns) {
        newColumns[col] = newColumns[col].filter(
          (t) => t.id !== draggedTask.id,
        );
      }

      if (prev[columnId].find((t) => t.id === draggedTask.id)) {
        return prev; // Task already exists in the target column, do not add again
      }

      // Add task to the new column
      newColumns[columnId] = [...newColumns[columnId], draggedTask];
      return newColumns;
    });

    setDraggedTask(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleLabelClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTaskLabel(task.label);
  };

  const saveEditedTask = (taskId: string) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      for (const col in newColumns) {
        newColumns[col] = newColumns[col].map((t) =>
          t.id === taskId ? { ...t, label: editingTaskLabel } : t,
        );
      }
      return newColumns;
    });
    setEditingTaskId(null);
    setEditingTaskLabel("");
  };

  const handleEditKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>,
    taskId: string,
  ) => {
    if (e.key === "Enter") {
      saveEditedTask(taskId);
    }
  };

  const deleteTask = (taskId: string) => {
    setColumns((prev) => {
      const newColumns = { ...prev };
      for (const col in newColumns) {
        newColumns[col] = newColumns[col].filter((t) => t.id !== taskId);
      }
      return newColumns;
    });
  };

  const addNewTaskInline = (columnId: string) => {
    if (enterBtnRef.current) {
      enterBtnRef.current = false;
      return;
    }

    if (newTaskInputLabel.trim() === "") {
      setIsAddingNewTask(false);
      setNewTaskInputLabel("");
      return;
    }

    const newTaskId = `task-${Date.now()}`;
    const newTask: Task = { id: newTaskId, label: newTaskInputLabel };

    setColumns((prev) => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }));

    setIsAddingNewTask(false);
    setNewTaskInputLabel("");
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Drag & Drop II</h2>
      <div className="board">
        {["todo", "in progress", "done"].map((col) => (
          <div
            key={col}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(col)}
          >
            <h4>
              {col === "todo"
                ? "To Do"
                : col === "in progress"
                  ? "In Progress"
                  : "Done"}
            </h4>

            {columns[col].map((task) => (
              <div
                key={task.id}
                className="task"
                draggable
                onDragStart={() => handleDragStart(task)}
              >
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editingTaskLabel}
                    onChange={(e) => setEditingTaskLabel(e.target.value)}
                    onBlur={() => saveEditedTask(task.id)}
                    onKeyDown={(e) => handleEditKeyPress(e, task.id)}
                    autoFocus
                    className="task-edit-input"
                  />
                ) : (
                  <>
                    <span
                      className="task-label"
                      onClick={() => handleLabelClick(task)}
                    >
                      {task.label}
                    </span>
                    <button
                      className="icon-button delete-btn"
                      title="Delete Task"
                      onClick={() => deleteTask(task.id)}
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            ))}
            {col === "todo" && (
              <div className="add-task-inline">
                {isAddingNewTask ? (
                  <input
                    type="text"
                    placeholder="Enter new task.."
                    value={newTaskInputLabel}
                    onChange={(e) => setNewTaskInputLabel(e.target.value)}
                    onBlur={() => addNewTaskInline(col)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        enterBtnRef.current = true;
                        addNewTaskInline(col);
                        e.target.blur();
                      }
                    }}
                    autoFocus
                    className="add-task-input-inline"
                  />
                ) : (
                  <button
                    className="add-task-placeholder"
                    onClick={() => setIsAddingNewTask(true)}
                  >
                    + Add a task
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
