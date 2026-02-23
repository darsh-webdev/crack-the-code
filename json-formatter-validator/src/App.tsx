import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormat = () => {
    // TODO: Implement format logic
  };

  const handleValidate = () => {
    // TODO: Implement validate logic
  };

  const handleMinify = () => {
    // TODO: Implement minify logic
  };

  const handleClear = () => {
    // TODO: Implement clear logic
  };

  return (
    <div>
      <h1>JSON Formatter & Validator</h1>
      <div className="container">
        <textarea
          id="input"
          placeholder="Enter your JSON here"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={15}
          cols={70}
        ></textarea>

        <div className="button-container">
          <button onClick={handleFormat}>Format</button>
          <button onClick={handleValidate}>Validate</button>
          <button onClick={handleMinify}>Minify</button>
          <button onClick={handleClear}>Clear</button>
        </div>
      </div>
    </div>
  );
}

export default App;
