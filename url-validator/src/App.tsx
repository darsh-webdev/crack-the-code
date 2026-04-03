import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  function validateUrl(value: string) {
    try {
      if (!value || /\s/.test(value)) return false;

      if (!value.includes("://")) return false;

      const url = new URL(value);
      const isHttp = url.protocol === "http:" || url.protocol === "https:";
      const hasValidHost =
        url.hostname === "localhost" || /\w+\.\w+/.test(url.hostname);
      return isHttp && hasValidHost;
    } catch (error) {
      return false;
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    setIsValid(validateUrl(value));
  };

  return (
    <div>
      <h1>URL Validator</h1>

      <div className="container">
        <input
          type="text"
          data-testid="url-input"
          className="url-input"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter URL here"
        />
        <p>
          {isValid !== null && (
            <p
              data-testid="result"
              style={{ color: isValid ? "green" : "red" }}
            >
              {isValid ? "Valid URL" : "Invalid URL"}
            </p>
          )}
        </p>
      </div>
    </div>
  );
}

export default App;
