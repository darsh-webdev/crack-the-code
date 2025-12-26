import { useEffect, useState } from "react";
import "./App.css";

type Todo = {
  id: number;
  title: string;
  time: number; // time in seconds
  isRunning: boolean;
};

function App() {
  // state variables
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  // useEffect for cleanup here
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.isRunning ? { ...todo, time: todo.time + 1 } : todo
        )
      );
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [todos]);

  //  helper functions
  const handleAddTodo = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      title: input.trim(),
      time: 0,
      isRunning: false,
    };
    setTodos([...todos, newTodo]);
    setInput("");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleReset = (id: number) => {
    return setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, time: 0, isRunning: false } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    return setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleTimer = (id: number) => {
    return setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isRunning: !todo.isRunning } : todo
      )
    );
  };

  return (
    <div className="App">
      <h2>Todo List with Timer</h2>
      <p>
        Build a todo list where each task has its own timer that can be started,
        paused, and reset.
      </p>
      <div className="container">
        <div className="todo-container">
          <h2>Todo with Timer</h2>
          <div className="input-container">
            <input
              type="text"
              className="todo-input"
              data-testid="todo-input"
              placeholder="Enter todo"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="add-button"
              data-testid="add-button"
              onClick={handleAddTodo}
            >
              Add
            </button>
          </div>
          <ul className="todo-list">
            {/* Map through todos */}
            {todos.length > 0 &&
              todos.map((todo) => (
                <li key={todo.id} data-testid="todo-item" className="todo-item">
                  <span className="todo-title">{todo.title}</span>
                  <div className="todo-time">{formatTime(todo.time)}</div>
                  <div className="button-group todo-actions">
                    <button
                      className={`timer-button ${
                        todo.isRunning ? "pause" : "start"
                      }`}
                      onClick={() => handleTimer(todo.id)}
                    >
                      {todo.isRunning ? "Pause" : "Start"}
                    </button>
                    <button
                      className="reset-button reset"
                      onClick={() => handleReset(todo.id)}
                    >
                      Reset
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
