import { useState } from "react";
import "./App.css";

const DROPDOWN_OPTIONS = [
  "Apple",
  "Banana",
  "Cherry",
  "Date",
  "Grape",
  "Lemon",
  "Mango",
  "Orange",
  "Papaya",
  "Pineapple",
  "Strawberry",
  "Watermelon",
];

function App() {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // TODO: Filter options based on inputValue and exclude selected ones
  const availableOptions = [];

  return (
    <div>
      <h1>Searchable Dropdown</h1>
      <div className="dropdown-wrapper">
        {/* TODO: Render selected tags */}

        <input
          data-testid="search-input"
          placeholder="Search fruits..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        {/* TODO: Render dropdown options */}
      </div>
    </div>
  );
}

export default App;
