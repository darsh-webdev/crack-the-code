import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div className="billing-container" data-testid="billing-container">
      <h2 data-testid="heading">Billing Counter System</h2>
      <div className="input-section" data-testid="counter-input-section">
        <input
          data-testid="counter-input"
          type="number"
          placeholder="Number of counters"
        />
        <button data-testid="set-counter-button">Set Counters</button>
      </div>
    </div>
  );
}

export default App;
