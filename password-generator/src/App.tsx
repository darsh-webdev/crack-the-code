import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="passwordGenerator">
      <h1>Password Generator</h1>
      <p>Create a secure and Strong Password, to keep your account Safe</p>

      <div className="passwordGenerator-container">
        <label htmlFor="passwordLength">
          Password Length
          <input
            type="number"
            id="passwordLength"
            data-testid="length-input"
            min="1"
            max="20"
          />
        </label>

        <div className="checkboxes">
          <label>
            <input type="checkbox" data-testid="lowercase-checkbox" />
            Include LowerCase
          </label>

          <label>
            <input type="checkbox" data-testid="uppercase-checkbox" />
            Include UpperCase
          </label>

          <label>
            <input type="checkbox" data-testid="number-checkbox" />
            Include Numbers
          </label>

          <label>
            <input type="checkbox" data-testid="symbols-checkbox" />
            Include Symbols
          </label>
        </div>

        <button className="generate-btn" data-testid="generate-button">
          Generate
        </button>
      </div>
    </div>
  );
}

export default App;
