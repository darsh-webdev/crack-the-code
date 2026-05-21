import { useMemo, useState } from "react";
import "./App.css";

type Task = {
  id: number;
  title: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

type DraggedTask = {
  taskId: number;
  sourceColumnId: string;
} | null;

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "Todo",
    tasks: [
      { id: 1, title: "Build UI" },
      { id: 2, title: "Setup API" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [{ id: 3, title: "Write tests" }],
  },
  {
    id: "done",
    title: "Done",
    tasks: [{ id: 4, title: "Create project" }],
  },
];

function App() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [newTask, setNewTask] = useState("");
  const [draggedTask, setDraggedTask] = useState<DraggedTask>(null);

  // Handle adding new task
  const handleAddTask = () => {
    if (!newTask.trim()) return;

    const newTaskObj: Task = {
      id: Date.now(),
      title: newTask.trim(),
    };

    setColumns((prev) =>
      prev.map((column) =>
        column.id === "todo"
          ? { ...column, tasks: [...column.tasks, newTaskObj] }
          : column,
      ),
    );
    setNewTask("");
  };

  // Handle drag start
  const handleDragStart = (taskId: number, sourceColumnId: string) => {
    setDraggedTask({
      taskId,
      sourceColumnId,
    });
  };

  // Allow drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Handle drop
  const handleDrop = (targetColumnId: string) => {
    if (!draggedTask) return;

    const { taskId, sourceColumnId } = draggedTask;

    // prevent unnecessary updates
    if (sourceColumnId === targetColumnId) {
      setDraggedTask(null);
      return;
    }

    let movedTask: Task | undefined;

    const updatedColumns = columns.map((column) => {
      // remove task from source
      if (column.id === sourceColumnId) {
        const remainingTasks = column.tasks.filter((task) => {
          if (task.id === taskId) {
            movedTask = task;
            return false;
          }

          return true;
        });

        return {
          ...column,
          tasks: remainingTasks,
        };
      }

      return column;
    });

    // task safety check
    if (!movedTask) {
      setDraggedTask(null);
      return;
    }

    const finalColumns = updatedColumns.map((column) => {
      // add task to target
      if (column.id === targetColumnId) {
        return {
          ...column,
          tasks: [...column.tasks, movedTask as Task],
        };
      }

      return column;
    });

    setColumns(finalColumns);
    setDraggedTask(null);
  };

  // Optional memoized total count
  const totalTasks = useMemo(() => {
    return columns.reduce((acc, column) => acc + column.tasks.length, 0);
  }, [columns]);

  return (
    <div className="app">
      <h1>Kanban Board</h1>

      <p className="task-count">Total Tasks: {totalTasks}</p>
      <div className="add-task-container">
        <input
          type="text"
          placeholder="Add a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="board">
        {columns.map((column) => (
          <div
            key={column.id}
            className="column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(column.id)}
          >
            <h2>{column.title}</h2>

            <div className="task-list">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                  onDragStart={() => handleDragStart(task.id, column.id)}
                >
                  {task.title}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
