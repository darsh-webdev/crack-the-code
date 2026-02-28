import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <header>
        <h1>Drag & Drop Fruits</h1>
        <button className="reset-btn">Reset Lists</button>
      </header>

      <div className="container">
        <div className="column">
          <h2>Available Fruits</h2>
          <p className="empty">No fruits here</p>
          <div className="item">Fruit Name</div>
        </div>

        <div className="column drop-zone">
          <h2>Dropped Fruits</h2>
          <p className="empty">Drop fruits here</p>
          <div className="item">Fruit Name</div>
        </div>
      </div>
    </div>
  );
}

export default App;
