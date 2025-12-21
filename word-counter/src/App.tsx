import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [count, setCount] = useState<[string, number][]>([]);

  function cleanString(str: string) {
    return str
      .replace(/[^\w\s]|_/g, "") // remove punctuation
      .replace(/\s+/g, " ") // collapse multiple spaces
      .trim(); // remove leading/trailing spaces
  }

  useEffect(() => {
    function handleCount() {
      // Count Logic
      const words = cleanString(text).toLowerCase().split(" ").filter(Boolean);
      const wordCounts: Record<string, number> = {};
      words.forEach((word) => {
        if (word in wordCounts) {
          wordCounts[word] += 1;
        } else {
          wordCounts[word] = 1;
        }
      });

      setCount(Object.entries(wordCounts).sort((a, b) => b[1] - a[1]));
    }

    // Function Call
    handleCount();
  }, [text]);

  return (
    <div className="wordCounter">
      <h1>Word Counter</h1>

      <div className="container">
        <textarea
          className="textarea"
          placeholder="Type your text here"
          data-testid="textarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>

        {/* Display result on if there are any characters or words */}
        {count.length > 0 && (
          <div className="results">
            <h3>Word Frequencies</h3>
            <ul data-testid="result-list">
              {count.map(([word, count]) => (
                <li key={word} data-testid={`word-${word}`}>
                  <strong>{word}</strong>: {count} Times
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
