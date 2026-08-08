import { useState, useRef } from "react";
import "./App.css";

const data = [
  "Apple",
  "Banana",
  "Orange",
  "Grapes",
  "Pineapple",
  "Mango",
  "Strawberry",
  "Blueberry",
  "Watermelon",
  "Papaya",
];

function App() {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value: string) => {
    setQuery(value);

    if (!value.trim()) {
      setFiltered([]);
      setShowDropdown(false);
      return;
    }

    const results = data.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase()),
    );

    setFiltered(results);
    setShowDropdown(true);
    setActiveIndex(-1);
  };

  const handleSelect = (value: string) => {
    setQuery(value);
    setShowDropdown(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
        break;

      case "Enter":
        if (activeIndex >= 0) {
          handleSelect(filtered[activeIndex]);
        }
        break;

      case "Escape":
        setShowDropdown(false);
        break;
    }
  };

  return (
    <div className="container">
      <h1>Typeahead Search</h1>

      <div className="input-wrapper">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search fruits..."
          className="input"
        />

        {showDropdown && filtered.length > 0 && (
          <ul className="dropdown">
            {filtered.map((item, index) => (
              <li
                key={item}
                className={`item ${index === activeIndex ? "active" : ""}`}
                onMouseDown={() => handleSelect(item)} // prevent blur issue
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
