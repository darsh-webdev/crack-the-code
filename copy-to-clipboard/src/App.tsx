import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCopy = async () => {
    const valueToCopy = input.trim();

    if (!valueToCopy) {
      setMessage({ text: "Type some values to copy", type: "error" });
      return;
    }

    try {
      await navigator.clipboard.writeText(valueToCopy);
      setMessage({ text: "✓ Copied!", type: "success" });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setMessage({ text: "Failed to copy to clipboard", type: "error" });
    }
  };

  useEffect(() => {
    if (message.text && message.type === "success") {
      const timer = setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="copyToClipboard">
      <h1>Copy to Clipboard</h1>
      <p>Click the button to copy the text</p>

      <div className="copyToClipboard-container">
        <div className="form">
          <label htmlFor="text">
            Enter your text:
            <input
              type="text"
              id="text"
              data-testid="input-field"
              placeholder="Type Something"
              value={input}
              onChange={handleInputChange}
            />
          </label>
          <button
            onClick={() => {
              handleCopy();
            }}
            className="btn"
            data-testid="copy-button"
          >
            Copy
          </button>
        </div>
        {message.text && (
          <div
            className={`${
              message.type === "error" ? "errorMessage" : "message"
            }`}
            data-testid={`${
              message.type === "error" ? "error-message" : "copied-message"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
