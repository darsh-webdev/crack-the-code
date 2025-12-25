import "./App.css";

function App() {
  // Add your state variables here

  // Add your useEffect for cleanup here

  // Add your helper functions here (formatTime, handleAddTodo, etc.)

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
              // Add your value and onChange handlers
            />
            <button
              className="add-button"
              data-testid="add-button"
              // Add your onClick handler
            >
              Add
            </button>
          </div>
          <ul className="todo-list">
            {/* Map through your todos here */}
            <li data-testid="todo-item" className="todo-item">
              <span className="todo-text">Example Todo</span>
              <div className="timer">00:00</div>
              <div className="button-group todo-actions">
                <button className="timer-button start">Start</button>
                <button className="reset-button reset">Reset</button>
                <button className="delete-button">Delete</button>
              </div>
            </li>
          </ul>
        </div>
        {/* <Template /> */}
      </div>
    </div>
  );
}

export default App;
