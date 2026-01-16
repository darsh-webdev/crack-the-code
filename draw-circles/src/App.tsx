import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const handleDraw = () => {};

  const handleUndo = () => {};

  const handleRedo = () => {};

  return (
    <div className="circle-drawer">
      <h1>Draw Circles</h1>
      <div
        data-testid="drawing-area"
        className="drawing-area"
        onClick={handleDraw}
      ></div>
      <div className="buttons">
        <button className="undo-btn" onClick={handleUndo}>
          Undo
        </button>
        <button className="redo-btn" onClick={handleRedo}>
          Redo
        </button>
      </div>
    </div>
  );
}

export default App;
