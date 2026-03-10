import { useState } from "react";
import "./App.css";

const columns = ["todo", "in-progress", "completed"];

type Task = {
  id: number;
  title: string;
  status: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;

    const task = {
      id: Date.now(),
      title: newTask.trim(),
      status: "todo",
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  const moveTask = (id: number, direction: "left" | "right") => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          const currentIndex = columns.indexOf(task.status);
          const newIndex =
            direction === "right" ? currentIndex + 1 : currentIndex - 1;
          return { ...task, status: columns[newIndex] };
        }
        return task;
      }),
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const saveTitle = (id: number) => {
    if (!editingTitle.trim()) return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, title: editingTitle.trim() } : task,
      ),
    );
    setEditingId(null);
    setEditingTitle("");
  };

  return (
    <div>
      <h2>Kanban Board</h2>
      <input
        data-testid="task-input"
        placeholder="Enter task"
        className="inputBox"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button
        data-testid="add-task-button"
        className="addTaskBtn"
        onClick={addTask}
      >
        Add Task
      </button>
      <div className="kanban-board">
        {columns.map((col) => (
          <div key={col} className="column" data-testid={`column-${col}`}>
            <h4>{col.replace("-", " ").toUpperCase()}</h4>
            {tasks
              .filter((task) => task.status === col)
              .map((task) => (
                <div
                  className="task-card"
                  key={task.id}
                  data-testid={`task-${task.id}`}
                >
                  {editingId === task.id ? (
                    <input
                      autoFocus
                      data-testid={`task-title-edit-${task.id}`}
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      onBlur={() => saveTitle(task.id)}
                      onKeyDown={(e) => e.key === "Enter" && saveTitle(task.id)}
                    />
                  ) : (
                    <p data-testid={`task-title-${task.id}`}>{task.title}</p>
                  )}
                  <div className="task-buttons">
                    {col !== "todo" && (
                      <button
                        className="shiftBtn"
                        onClick={() => moveTask(task.id, "left")}
                        data-testid={`move-left-${task.id}`}
                      >
                        ←
                      </button>
                    )}
                    {col !== "completed" && (
                      <button
                        className="shiftBtn"
                        onClick={() => moveTask(task.id, "right")}
                        data-testid={`move-right-${task.id}`}
                      >
                        →
                      </button>
                    )}
                    <button
                      className="editBtn"
                      data-testid={`edit-button-${task.id}`}
                      onClick={() => {
                        setEditingId(task.id);
                        setEditingTitle(task.title);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="deleteBtn"
                      data-testid={`delete-button-${task.id}`}
                      onClick={() => deleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
