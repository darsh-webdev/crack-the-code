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
    <div className="app">
      <div className="card">
        <h1 className="title">🔗 URL Validator</h1>

        <input
          type="text"
          data-testid="url-input"
          className="url-input"
          value={input}
          onChange={handleInputChange}
          placeholder="https://example.com"
        />

        {isValid !== null && (
          <p
            data-testid="result"
            className={`result ${isValid ? "valid" : "invalid"}`}
          >
            {isValid ? "✅ Valid URL" : "❌ Invalid URL"}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
