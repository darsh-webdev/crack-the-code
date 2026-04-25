import { useState, useRef } from "react";
import { useClickOutside } from "./useClickOutside";
import "./App.css";

function App() {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(boxRef, () => {
    setOpen(false);
  });

  return (
    <div className="container">
      <h1>Click Outside Detector</h1>

      <button onClick={() => setOpen((prev) => !prev)}>Toggle Dropdown</button>

      {open && (
        <div ref={boxRef} className="dropdown">
          <p>Click outside me to close ❌</p>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
