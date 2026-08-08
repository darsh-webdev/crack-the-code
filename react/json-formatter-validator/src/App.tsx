import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed, null, 2));
      setSuccess("JSON formatted successfully!");
      setError("");
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setFormatted("");
      setSuccess("");
    }
  };

  const handleValidate = () => {
    const jsonString = input.trim();
    try {
      JSON.parse(jsonString);
      setSuccess("Valid JSON!");
      setError("");
      setFormatted("");
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setSuccess("");
      setFormatted("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setFormatted(JSON.stringify(parsed));
      setSuccess("JSON minified successfully!");
      setError("");
    } catch (err) {
      setError("Invalid JSON: " + err.message);
      setFormatted("");
      setSuccess("");
    }
  };

  const handleClear = () => {
    setInput("");
    setFormatted("");
    setError("");
    setSuccess("");
  };

  return (
    <div>
      <h1>JSON Formatter & Validator</h1>
      <div className="container">
        <textarea
          id="input"
          data-testid="json-input"
          placeholder="Enter your JSON here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={15}
          cols={70}
        ></textarea>

        <div data-testid="btn-group" className="button-container">
          <button data-testid="format-btn" onClick={handleFormat}>
            Format
          </button>
          <button data-testid="validate-btn" onClick={handleValidate}>
            Validate
          </button>
          <button data-testid="minify-btn" onClick={handleMinify}>
            Minify
          </button>
          <button data-testid="clear-btn" onClick={handleClear}>
            Clear
          </button>
        </div>

        <div>
          {error && (
            <div data-testid="error-message" className="error">
              {error}
            </div>
          )}
          {success && (
            <div data-testid="success-message" className="success">
              {success}
            </div>
          )}
        </div>

        {formatted && (
          <pre data-testid="formatted-output" className="output">
            {formatted}
          </pre>
        )}
      </div>
    </div>
  );
}

export default App;
