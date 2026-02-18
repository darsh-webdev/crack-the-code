import { useState } from "react";
import "./App.css";

function App() {
  const [listOne, setListOne] = useState([
    { id: 1, name: "Item A" },
    { id: 2, name: "Item B" },
    { id: 3, name: "Item C" },
  ]);
  const [listTwo, setListTwo] = useState([]);

  return (
    <div className="main">
      <h1>Transfer List</h1>

      <div className="container">
        <div>
          <h2>Available</h2>
        </div>
        <div className="buttons">
          <button>→</button>
          <button>←</button>
        </div>
        <div>
          <h2>Selected</h2>
        </div>
      </div>

      <div className="lists-container">
        <div className="list">
          {listOne.map((item) => (
            <div>
              <input
                key={item.id}
                type="checkbox"
                value={item.id}
                id={`item-${item.id}`}
              />
              <label htmlFor={`item-${item.id}`}>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
