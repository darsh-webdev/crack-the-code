/*
Problem Statement: Create a React component that allows users to input
a number and checks whether the number is even or odd. The component
displays the result with a 1-second loading delay and handles invalid input.
*/

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsChecking(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [isChecking]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const checkEvenOdd = () => {
    // Trim whitespace
    const trimmed = input.trim();

    // Check if input is empty
    if (trimmed === "") {
      setResult("Please enter a valid number.");
      return;
    }

    // Convert to number
    const number = Number(trimmed);

    // Validate if it's actually a number
    if (isNaN(number)) {
      setResult("Please enter a valid number.");
      return;
    }

    setIsChecking(true);
    setResult(
      number % 2 === 0
        ? `The number ${number} is even.`
        : `The number ${number} is odd.`
    );
  };

  return (
    <div className="even-odd-container">
      <h1 className="title">Even or Odd Checker</h1>

      <input
        className="number-input"
        type="text"
        placeholder="Enter a number"
        value={input}
        onChange={handleChange}
        data-testid="number-input"
      />

      <button
        className="check-button"
        onClick={checkEvenOdd}
        data-testid="check-button"
      >
        Check
      </button>

      <div className="result-area">
        {isChecking ? (
          <div className="loading" data-testid="loading">
            Checking...
          </div>
        ) : (
          <div className="result" data-testid="result">
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
