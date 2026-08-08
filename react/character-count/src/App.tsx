import { useState } from "react";
import "./App.css";

function App() {
  const [inputCount, setInputCount] = useState("");
  const [textInput, setTextInput] = useState("");
  const [warning, setWarning] = useState("");
  const [error, setError] = useState("");

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputCount(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTextInput(text);

    const maxLength = parseInt(inputCount, 10);
    const currentLength = text.length;

    if (maxLength && currentLength > maxLength) {
      const exceededCount = currentLength - maxLength;
      setError(`Limit exceeded by ${exceededCount} characters`);
      setWarning("");
    } else if (maxLength && currentLength >= maxLength * 0.9) {
      setWarning("You are close to the limit!");
      setError("");
    } else {
      setWarning("");
      setError("");
    }
  };

  return (
    <div className="characterCount">
      <h1>Character Count</h1>
      <p>Track your input length with live character warnings.</p>

      <div className="container">
        <div className="inputs">
          <label>
            Max length:
            <input
              type="number"
              min="0"
              max="1000"
              value={inputCount}
              onChange={handleCountChange}
              data-testid="maxlength"
            />
          </label>
        </div>
        <textarea
          className="text"
          placeholder="Start Typing"
          data-testid="textarea"
          value={textInput}
          onChange={handleChange}
        ></textarea>

        <div className="char-info" data-testid="char-info">{`${
          textInput.length
        } / ${inputCount ? inputCount : 50}`}</div>

        <div className="warnings">
          {warning && (
            <p className="warning-text" data-testid="warning-text">
              {warning}
            </p>
          )}

          {error && (
            <p className="error-message" data-testid="error-text">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
