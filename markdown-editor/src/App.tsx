import { useState } from "react";
import { marked } from "marked";
import "./App.css";

function App() {
  const [textInput, setTextInput] = useState("");

  const getMarkdownText = () => {
    return { __html: marked.parse(textInput) };
  };
  return (
    <div>
      <h1>Markdown Editor</h1>
      <div className="editor-container">
        <div className="editor-section">
          <h2>Markdown Input</h2>
          <textarea
            className="markdown-input"
            placeholder="Write Markdown here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
        </div>

        <div className="preview-section">
          <h2>Live Preview</h2>
          <div
            className="markdown-preview"
            role="region"
            dangerouslySetInnerHTML={getMarkdownText()}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
