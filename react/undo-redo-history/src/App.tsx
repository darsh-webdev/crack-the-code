import { useState } from "react";
import "./App.css";

type HistoryState = {
  past: string[];
  present: string;
  future: string[];
};

function App() {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: "",
    future: [],
  });

  const handleChange = (value: string) => {
    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: value,
      future: [], // clear future on new action
    }));
  };

  const handleUndo = () => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;

      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, -1);

      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  };

  const handleRedo = () => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;

      const next = prev.future[0];
      const newFuture = prev.future.slice(1);

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  };

  const handleReset = () => {
    setHistory({
      past: [],
      present: "",
      future: [],
    });
  };

  return (
    <div className="container">
      <h1>Undo / Redo with History</h1>

      <textarea
        value={history.present}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Start typing..."
        className="textarea"
      />

      <div className="buttons">
        <button onClick={handleUndo} disabled={history.past.length === 0}>
          Undo
        </button>

        <button onClick={handleRedo} disabled={history.future.length === 0}>
          Redo
        </button>

        <button onClick={handleReset} className="reset">
          Reset
        </button>
      </div>

      <div className="history">
        <div>
          <h3>Past</h3>
          <ul>
            {history.past.map((item, idx) => (
              <li key={idx}>{item || "''"}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Future</h3>
          <ul>
            {history.future.map((item, idx) => (
              <li key={idx}>{item || "''"}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
