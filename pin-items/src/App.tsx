import { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([
    { id: 1, text: "Buy groceries", pinned: false },
    { id: 2, text: "Call Alice", pinned: false },
    { id: 3, text: "Meeting with Bob", pinned: false },
    { id: 4, text: "Pay electricity bill", pinned: false },
    { id: 5, text: "Read a book", pinned: false },
    { id: 6, text: "Go for a walk", pinned: false },
    { id: 7, text: "Fix bug #234", pinned: false },
    { id: 8, text: "Review pull requests", pinned: false },
  ]);

  return (
    <div className="container" data-testid="app-container">
      <h1 data-testid="main-title">Pin Items To Top</h1>
      <ul data-testid="item-list">
        {items.map((item) => (
          <li key={item.id} className={item.pinned ? "pinned" : ""}>
            <label>
              <input type="checkbox" data-testid={`pin-checkbox-${item.id}`} />
              {item.text}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
