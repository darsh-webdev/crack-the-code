import { useState, useMemo } from "react";
import { usePrevious } from "./usePrevious";
import "./App.css";

type DiffPart = {
  char: string;
  changed: boolean;
};

// Simple diff logic (character-based)
function getDiff(prev: string, current: string): DiffPart[] {
  const maxLength = Math.max(prev.length, current.length);
  const result: DiffPart[] = [];

  for (let i = 0; i < maxLength; i++) {
    const prevChar = prev[i] ?? "";
    const currChar = current[i] ?? "";

    result.push({
      char: currChar,
      changed: prevChar !== currChar,
    });
  }

  return result;
}

function App() {
  const [text, setText] = useState("");
  const prevText = usePrevious(text) ?? "";

  // 🔹 Memoized diff computation
  const diff = useMemo(() => {
    return getDiff(prevText, text);
  }, [prevText, text]);

  return (
    <div className="container">
      <h1>usePrevious + Diff Viewer</h1>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
        className="textarea"
      />

      <div className="panel">
        <div>
          <h3>Previous</h3>
          <p className="box">{prevText || "—"}</p>
        </div>

        <div>
          <h3>Current (Diff Highlighted)</h3>
          <p className="box">
            {diff.map((part, index) => (
              <span key={index} className={part.changed ? "changed" : ""}>
                {part.char}
              </span>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
