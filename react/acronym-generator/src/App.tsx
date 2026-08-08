import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  function toAcronym(text: string) {
    const words = text.split(" ");
    const output = words
      .filter((word) => word.length > 0)
      .map((word) => word[0].toUpperCase())
      .join("");
    setResult(output);
  }

  return (
    <div className="container">
      <h1>Acronym Generator</h1>
      <p>
        An acronym is formed by taking the first letter of each word in a phrase
        and converting them to uppercase.
      </p>

      <div>
        <input
          type="text"
          placeholder="Enter a phrase..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          data-testid="input"
        />

        <button onClick={() => toAcronym(input)} data-testid="generate-button">
          Generate
        </button>
        <p data-testid="result">Result : {result}</p>
      </div>
    </div>
  );
}

export default App;
