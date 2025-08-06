import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const checkLeapYear = () => {
    setResult("");
    setError("");
    if (!input) {
      setError("Please enter a year");
      return;
    }

    const year = Number(input);
    if (isNaN(year) || !Number.isInteger(year) || year <= 0) {
      setError("Please enter a valid positive integer year");
      return;
    }

    if (year % 400 === 0 || (year % 4 === 0 && year % 100 !== 0)) {
      setResult(`${input} is a Leap Year`);
    } else {
      setResult(`${input} is not a Leap Year`);
    }
  };
  return (
    <div className="container">
      <h1>Leap Year Checker</h1>
      <label data-testid="label-date">Enter a year:</label>
      <input
        type="text"
        data-testid="year-input"
        value={input}
        onChange={(e) => setInput(e.target.value.trim())}
      />

      <button data-testid="check-btn" onClick={checkLeapYear}>
        Check
      </button>

      {result && (
        <div data-testid="result" className="result">
          {result}
        </div>
      )}

      {error && (
        <div data-testid="error-msg" className="error">
          {error}
        </div>
      )}
    </div>
  );
}

export default App;
