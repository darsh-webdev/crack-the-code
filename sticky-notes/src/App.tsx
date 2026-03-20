import { useState } from "react";
import { Plus, X } from "lucide-react";
import "./App.css";

function App() {
  return (
    <>
      <h1>Sticky Notes</h1>
      <div className="container">
        <div>
          <div className="note">
            <button className="close-btn">
              <X className="icon-close" />
            </button>
            <textarea className="note-textarea" />
          </div>
        </div>

        <button className="add-note-btn">
          <Plus className="icon-add" />
        </button>
      </div>
    </>
  );
}

export default App;
