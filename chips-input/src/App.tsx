import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chipsList, setChipsList] = useState<string[]>([]);

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim() === "") return alert("Input cannot be empty");

      setChipsList((prev) => [...prev, input.trim()]); // Add new chips to array
      setInput("");
    }
  };

  const handleDelete = (index: number) => {
    const chipsCopy = [...chipsList];
    chipsCopy.splice(index, 1);
    setChipsList(chipsCopy);
  };

  return (
    <div className="container">
      <h1>Chips Input</h1>
      <input
        className="chip-input"
        type="text"
        placeholder="Type a chip and press enter"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => handleEnterPress(e)}
      />

      <div className="chips-container">
        {chipsList.map((chip, index) => (
          <div className="chip" key={index}>
            <p>{chip}</p>
            <button className="delete-btn" onClick={() => handleDelete(index)}>
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
