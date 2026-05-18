import { useState, useRef, useEffect } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const highlightedOptionRef = useRef<HTMLLIElement | null>(null);

  const filteredOptions = DROPDOWN_OPTIONS.filter(
    (opt) =>
      !selected.includes(opt) &&
      opt.toLowerCase().includes(inputValue.toLowerCase()),
  );

  const handleSelect = (value: string) => {
    setSelected((prev) => [...prev, value]);
    setInputValue("");
    setIsOpen(false);
    setHighlightedIndex(0);
  };

  const handleRemove = (value: string) => {
    setSelected((prev) => prev.filter((item) => item !== value));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev + 1 >= filteredOptions.length ? 0 : prev + 1,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev - 1 < 0 ? filteredOptions.length - 1 : prev - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      const option = filteredOptions[highlightedIndex];
      if (option) {
        handleSelect(option);
      }
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  useEffect(() => {
    highlightedOptionRef.current?.scrollIntoView({ block: "nearest" });
  }, [highlightedIndex]);

  return (
    <div>
      <h1>Searchable Dropdown</h1>
      <div className="dropdown-wrapper" ref={dropdownRef}>
        <div className="selected-tags">
          {selected.map((item) => {
            const label = DROPDOWN_OPTIONS.find((opt) => opt === item);
            return (
              <span key={item} className="tag">
                {label}
                <button onClick={() => handleRemove(item)}>x</button>
              </span>
            );
          })}
        </div>

        <input
          data-testid="search-input"
          placeholder="Search fruits..."
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setHighlightedIndex(0);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />

        {isOpen && (
          <ul className="dropdown">
            {filteredOptions.map((option, index) => (
              <li
                key={option}
                className={`dropdown-option ${index === highlightedIndex ? "highlighted" : ""}`}
                ref={index === highlightedIndex ? highlightedOptionRef : null}
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
            {filteredOptions.length === 0 && (
              <li className="no-options">No options found</li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
