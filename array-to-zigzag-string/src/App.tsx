/*
Problem Statement: Create a React component that allows users to input multiple 
comma-separated strings and outputs a zigzag merged string. The component merges
the strings such that strings at even indices are appended as is, while strings 
at odd indices are reversed before appending.
*/

import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    // If input is empty, output result is empty
    if (input.trim() === "") setResult("");

    // Split input string by commas into array
    const strings = input.split(",");

    const resultString = strings
      .map((string, index) => {
        let str = string.trim();
        // If string is at odd index reverse the string
        if (index % 2 !== 0) {
          str = str.split("").reverse().join("");
        }
        return str;
      })
      .join("");

    setResult(resultString);
  };

  return (
    <div className="container">
      <h1>Array to Zigzag String</h1>
      <div>
        <input
          type="text"
          placeholder="Enter strings like one,two,three"
          data-testid="input-box"
          value={input}
          onChange={handleInputChange}
        />
        <button data-testid="submit-button" onClick={handleSubmit}>
          Submit
        </button>
        <p data-testid="output-result">Output: {result}</p>
      </div>
    </div>
  );
}

export default App;
