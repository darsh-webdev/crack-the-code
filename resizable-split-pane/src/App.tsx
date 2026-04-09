import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [leftWidth, setLeftWidth] = useState(200);
  const isDragging = useRef(false);
  const containerRef = useRef(null);

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!isDragging.current) return;

    const containerLeft = containerRef.current.getBoundingClientRect().left;
    const newWidth = e.clientX - containerLeft;

    if (newWidth >= 100) {
      setLeftWidth(newWidth);
    }
  };

  return (
    <div className="App">
      <h1>Resizable Split Pane</h1>

      <div
        className="container"
        data-testid="container"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={containerRef}
      >
        <div
          className="left-pane"
          data-testid="left-pane"
          style={{ width: leftWidth }}
        >
          <p>Left Pane</p>
        </div>
        <div
          className="divider"
          data-testid="divider"
          onMouseDown={handleMouseDown}
        ></div>
        <div className="right-pane" data-testid="right-pane">
          <p>Right Pane (auto expands)</p>
        </div>
      </div>
    </div>
  );
}

export default App;
