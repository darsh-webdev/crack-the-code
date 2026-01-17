import { useState, useEffect, useRef } from "react";
import "./App.css";

type Circle = {
  x: number;
  y: number;
};

function App() {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [redoStack, setRedoStack] = useState<Circle[]>([]);

  const drawingAreaRef = useRef<HTMLDivElement | null>(null);

  const handleDraw = (e: React.MouseEvent) => {
    if (!drawingAreaRef.current) return;

    const rect = drawingAreaRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newCircle = { x, y };
    setCircles((prev) => [...prev, newCircle]);
    setRedoStack([]); // Clear redo stack on new action
  };

  const handleUndo = () => {
    if (circles.length === 0) return;
    const newCircles = [...circles];
    const undoneCircle = newCircles.pop();
    if (!undoneCircle) return;
    setCircles(newCircles);
    setRedoStack([...redoStack, undoneCircle]);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const newRedoStack = [...redoStack];
    const redoneCircle = newRedoStack.pop();
    if (!redoneCircle) return;
    setCircles([...circles, redoneCircle]);
    setRedoStack(newRedoStack);
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "z") handleUndo();
      if (e.ctrlKey && e.key === "x") handleRedo();
    };
    window.addEventListener("keydown", keyHandler);

    return () => {
      return window.removeEventListener("keydown", keyHandler);
    };
  }, [circles, redoStack]);

  return (
    <div className="circle-drawer">
      <h1>Draw Circles</h1>
      <div
        data-testid="drawing-area"
        className="drawing-area"
        onClick={handleDraw}
        ref={drawingAreaRef}
      >
        {circles.map((circle, index) => (
          <div
            className="circle"
            style={{ left: circle.x, top: circle.y }}
            key={index}
            data-testid="circle"
          ></div>
        ))}
      </div>
      <div className="buttons">
        <button
          className="undo-btn"
          onClick={handleUndo}
          disabled={circles.length === 0}
        >
          Undo
        </button>
        <button
          className="redo-btn"
          onClick={handleRedo}
          disabled={redoStack.length === 0}
        >
          Redo
        </button>
      </div>
    </div>
  );
}

export default App;
