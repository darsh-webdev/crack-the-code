import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="dropdown-container">
      <h2 className="dropdown-title">Multiselect Dropdown Menu</h2>
      <label className="dropdown-label">Select Options:</label>
      <div className="dropdown-wrapper">
        <button className="dropdown-toggle">
          <span className="dropdown-icon">Icon</span>
          <span className="dropdown-button-label">Choose Options</span>
        </button>
        <ul className="dropdown-menu">
          <li className="dropdown-reset">Reset Selection</li>
          <li className="dropdown-option">
            <input type="checkbox" />
            <span className="option-label">Option 1</span>
          </li>
        </ul>
      </div>

      <button className="submit-button">Submit</button>
      <div className="result-area"></div>
    </div>
  );
}

export default App;
