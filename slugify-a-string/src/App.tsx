import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const slugifyString = (str: string) => {
    return str
      .normalize("NFD") // separate accent from letter
      .replace(/[\u0300-\u036f]/g, "") // remove accent marks
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  return (
    <div className="container">
      <h1>Slugify a String</h1>

      <div>
        <input
          className="input-box"
          data-testid="input-box"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your text here"
        />
        <div>
          <p className="result" data-testid="result">
            {slugifyString(input)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
