import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div>
      <h1>Markdown Editor</h1>
      <div className="editor-container">
        <div className="editor-section">
          <h2>Markdown Input</h2>
          <textarea
            className="markdown-input"
            placeholder="Write Markdown here..."
          />
        </div>

        <div className="preview-section">
          <h2>Live Preview</h2>
          <div className="markdown-preview" role="region" />
        </div>
      </div>
    </div>
  );
}

export default App;
