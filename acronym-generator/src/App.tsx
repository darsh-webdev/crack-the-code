import { useState } from "react";
import "./App.css";

function App() {
  function toAcronym(text: string) {
    // Implement acronym logic here
  }

  return (
    <div className="container">
      <h1>Acronym Generator</h1>
      <p>
        An acronym is formed by taking the first letter of each word in a phrase
        and converting them to uppercase.
      </p>

      <div>
        <input type="text" placeholder="Enter a phrase..." />
        <button>Generate</button>
        <p>Result : </p>
      </div>
    </div>
  );
}

export default App;
