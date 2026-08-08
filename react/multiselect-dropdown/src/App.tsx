import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./App.css";

const OPTIONS = [
  "Python",
  "JavaScript",
  "Java",
  "C#",
  "C++",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "PHP",
];

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedOptions, setSubmittedOptions] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
    setErrorMessage("");
  };

  const handleOptionClick = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }

    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (selectedOptions.length === 0) {
      setErrorMessage("Please select at least one option.");
      return;
    }
    setSubmittedOptions(selectedOptions);
    setErrorMessage("");
  };

  const handleReset = () => {
    setSelectedOptions([]);
    setSubmittedOptions([]);
    setErrorMessage("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown-container">
      <h2 className="dropdown-title">Multiselect Dropdown Menu</h2>
      <label className="dropdown-label">Select Options:</label>
      <div className="dropdown-wrapper" ref={dropdownRef}>
        <button className="dropdown-toggle" onClick={toggleDropdown}>
          <span className="dropdown-icon">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </span>
          <span className="dropdown-button-label">
            {selectedOptions.length > 0
              ? `${selectedOptions.length} selected`
              : "Choose Options"}
          </span>
        </button>
        {isOpen && (
          <ul className="dropdown-menu">
            <li className="dropdown-reset" onClick={handleReset}>
              Reset Selection
            </li>
            {OPTIONS.map((option) => (
              <li
                key={option}
                className={`dropdown-option ${
                  selectedOptions.includes(option) ? "selected" : ""
                }`}
                onClick={() => handleOptionClick(option)}
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  readOnly
                />
                <span className="option-label">{option}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
      <div className="result-area">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {submittedOptions.length > 0 && (
          <div className="selected-options">
            <strong>Selected:</strong> {submittedOptions.join(", ")}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
