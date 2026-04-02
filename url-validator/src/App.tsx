import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState(null);

  function validateUrl() {
    // Write logic to validate the url
  }

  return (
    <div>
      <h1>URL Validator</h1>

      <div className="container">
        <input
          type="text"
          data-testid="url-input"
          className="url-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter URL here"
        />
        <p>
          {isValid !== null && (
            <p style={{ color: isValid ? "green" : "red" }}>
              {isValid ? "Valid URL" : "Invalid URL"}
            </p>
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
