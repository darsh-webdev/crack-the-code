/*
Problem Statement: Build a Color Explorer component that helps users
explore colors by typing in natural language color names like "lavender", "skyblue".
The app matches the user's input against a predefined color dictionary and displays
the color name and its corresponding HEX code. The input is case-insensitive and
whitespace us ignored.
*/

import { useState } from "react";
import { colorNameToHex } from "./colorData";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [color, setColor] = useState({ name: "", hex: "" });
  const [isColorValid, setIsColorValid] = useState(true);

  const searchColor = () => {
    const inputColor = input.replace(" ", "").toLowerCase();
    const hexValue = colorNameToHex(inputColor);
    if (hexValue === undefined) {
      setColor({ name: "", hex: "" });
      setIsColorValid(false);
      return;
    }
    setIsColorValid(true);
    setColor({ name: input, hex: hexValue });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value.trim());
  };

  return (
    <div className="container">
      <h1>Color Explorer</h1>
      <div className="input-section">
        <input
          type="text"
          data-testid="color-input"
          placeholder="Type a color name e.g. lavender"
          value={input}
          onChange={handleChange}
        />
        <button data-testid="search-button" onClick={searchColor}>
          🔍
        </button>
      </div>
      {!isColorValid && (
        <div>
          <p className="error" data-testid="error-msg">
            Sorry, I couldn't recognise that color.
          </p>
        </div>
      )}
      {color.hex && (
        <div className="color-box" data-testid="color-box">
          <div
            className="preview"
            role="presentation"
            data-testid="color-preview"
            style={{ backgroundColor: color.hex }}
          ></div>
          <p data-testid="color-name">
            <strong>Name:</strong> {color.name}
          </p>
          <p data-testid="color-hex">
            <strong>Hex:</strong> {color.hex}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
