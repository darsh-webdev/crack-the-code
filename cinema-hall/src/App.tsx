import { useState } from "react";
import "./App.css";

const ROW = 10,
  COL = 10;

const rowLabels = "ABCDEFGHIJ".split("");

function App() {
  return (
    <div className="main-container">
      <h1>Cinema Hall</h1>
      <div className="screen">Screen</div>

      <div className="button-section">
        <button>Book Seats</button>
        <button>Clear</button>
        <button>Reset</button>
      </div>

      <div className="cinema-hall">
        {Array.from({ length: ROW }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: COL }, (_, colIdx) => {
              const seatLabel = `${rowLabels[rowIdx]}${colIdx}`;

              return (
                <div className="col" key={colIdx}>
                  {seatLabel}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
