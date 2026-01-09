import { useState } from "react";
import "./App.css";

function App() {
  // TODO: Create a state variable isOpen and setIsOpen using useState

  // TODO: Create functions handleOpen and handleClose to toggle modal visibility

  return (
    <div style={{ textAlign: "center", padding: "50px", height: "100vh" }}>
      <h1>Modal Popup</h1>

      <button>Open Modal</button>

      {/* TODO: Conditionally render the modal when isOpen is true */}
      {/* Modal should close when clicking the backdrop or the Close button */}
      {/* Modal content should not close when clicking inside */}
    </div>
  );
}

export default App;
