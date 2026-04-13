import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const getSavedInputData = () => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("input-data");
      return savedData ? savedData : "";
    }

    return "";
  };

  const [inputText, setInputText] = useState(getSavedInputData());

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("input-data", inputText);
    }
  }, [inputText]);

  const handleClearInput = () => {
    setInputText("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("input-data");
    }
  };

  return (
    <>
      <h1>Auto Save Text</h1>

      <div className="container">
        <div className="input-container">
          <div className="input-field">
            <label>Name: </label>
            <input
              type="text"
              name="name"
              data-testid="input-field"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <button
            type="button"
            data-testid="clear-btn"
            className="clear-btn"
            onClick={handleClearInput}
          >
            Clear
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
