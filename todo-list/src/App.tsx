import { useState } from "react";
import "./App.css";

type TodoItem = {
  id: number;
  text: string;
  completed: boolean;
};

function App() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  const handleAddTodoItem = () => {
    if (input.trim() === "") {
      return alert("Cannot add empty todo");
    }

    const newItem = {
      id: todoList.length + 1,
      text: input.trim(),
      completed: false,
    };

    setTodoList((prev) => [...prev, newItem]);
    setInput("");
  };

  const handleTodoToggle = (id: number) => {
    setTodoList(
      todoList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        } else {
          return todo;
        }
      })
    );
  };

  const handleDeleteTodoItem = (id: number) => {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Input Container */}
      <div>
        <input
          type="text"
          className="todo-input"
          placeholder="Enter todo.."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="add-btn" onClick={() => handleAddTodoItem()}>
          Add
        </button>
      </div>

      {/* Todos Container */}
      <div>
        <ul className="todo-list">
          {todoList.map((todo) => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleTodoToggle(todo.id)}
              />
              <span className={`${todo.completed ? "completed-todo" : ""}`}>
                {todo.text}
              </span>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTodoItem(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
