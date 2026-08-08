import { useState } from "react";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(4);
  const [includeLowerCase, setIncludeLowerCase] = useState(true);
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [error, setError] = useState("");

  function handleLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    let newlength = parseInt(e.target.value);
    if (newlength > 20) {
      setError("Max length is 20");
      setPassword("'");
      newlength = 20;
    }
    setLength(newlength);
  }
  function generatePassword() {
    setError("");
    if (!length || length === 0) {
      setError("Length cannot be Empty or 0");
      let characters = "";
      if (includeLowerCase) characters += "abcdefghijklmnopqrstuvwxyz";
      if (includeUpperCase) characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if (includeNumbers) characters += "1234567890";
      if (includeSymbols) characters += "!@#$^&*();:";
      if (characters.length === 0) {
        setError("Select at least one option");
        return;
      }
      let generatedPassword = "";
      for (let i = 0; i < length; i++) {
        const random = Math.floor(Math.random() * characters.length);
        generatedPassword += characters[random];
      }
      setPassword(generatedPassword);
    }
  }
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
            value={length}
            onChange={handleLengthChange}
          />
        </label>

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              data-testid="lowercase-checkbox"
              checked={includeLowerCase}
              onChange={() => setIncludeLowerCase(!includeLowerCase)}
            />
            Include LowerCase
          </label>

          <label>
            <input
              type="checkbox"
              data-testid="uppercase-checkbox"
              checked={includeUpperCase}
              onChange={() => setIncludeUpperCase(!includeUpperCase)}
            />
            Include UpperCase
          </label>

          <label>
            <input
              type="checkbox"
              data-testid="number-checkbox"
              checked={includeNumbers}
              onChange={() => setIncludeNumbers(!includeNumbers)}
            />
            Include Numbers
          </label>

          <label>
            <input
              type="checkbox"
              data-testid="symbols-checkbox"
              checked={includeSymbols}
              onChange={() => setIncludeSymbols(!includeSymbols)}
            />
            Include Symbols
          </label>
        </div>

        <button
          className="generate-btn"
          data-testid="generate-button"
          onClick={generatePassword}
        >
          Generate
        </button>

        <div className="result">
          {password && (
            <input type="text" value={password} data-testid="result" />
          )}
        </div>

        {error && (
          <p className="error" data-testid="error-message">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
