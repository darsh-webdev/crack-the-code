import { useState } from "react";
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

  // TODO:
  // Track currently dragged task
  // Suggested:
  // {
  //   taskId
  //   sourceColumnId
  // }

  // TODO:
  // Handle drag start
  // Save dragged task metadata

  // TODO:
  // Handle drag over
  // Prevent default to allow dropping

  // TODO:
  // Handle drop
  // Remove task from source column
  // Add task to target column
  // IMPORTANT:
  // - immutable updates only
  // - preserve task order

  // TODO:
  // Optional:
  // Add reordering within same column

  return (
    <div className="app">
      <h1>Kanban Board with Drag & Drop</h1>

      <div className="board">
        {columns.map((column) => (
          <div
            key={column.id}
            className="column"
            // TODO:
            // Handle drag over
            // Handle drop
          >
            <h2>{column.title}</h2>

            <div className="task-list">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="task"
                  draggable
                  // TODO:
                  // Handle drag start
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
