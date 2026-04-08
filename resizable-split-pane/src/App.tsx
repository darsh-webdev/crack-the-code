import { useState, useRef } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Resizable Split Pane</h1>

      <div className="container" data-testid="container">
        <div className="left-pane" data-testid="left-pane">
          <p>Left Pane</p>
        </div>
        <div className="divider" data-testid="divider"></div>
        <div className="right-pane" data-testid="right-pane">
          <p>Right Pane (auto expands)</p>
        </div>
      </div>
    </div>
  );
}

export default App;
