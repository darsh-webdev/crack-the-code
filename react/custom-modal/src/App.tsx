import { useState } from "react";
import "./App.css";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "50px", height: "100vh" }}>
      <h1>Modal Popup</h1>
      <button onClick={handleOpen}>Open Modal</button>

      {/* Modal  */}
      {isOpen && (
        <div
          data-testid="modal-backdrop"
          className="modal-container"
          onMouseDown={handleClose}
        >
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <h2>Modal Header</h2>
            <div>
              <p>This is the modal body</p>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
