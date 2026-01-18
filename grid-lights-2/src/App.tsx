import { useState } from "react";
import "./App.css";

const TOTAL = 9;
const GRID_SIZE = 3;

function App() {
  const [activeCells, setActiveCells] = useState(new Set());
  const [activationOrder, setActivationOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleClick = (index: number) => {
    // TODO: Implement click logic
  };

  const startReverseDeactivation = (order) => {
    // TODO: Implement reverse deactivation
  };

  const resetGrid = () => {
    // TODO: Implement reset logic
  };

  return (
    <div className="main-container">
      <h1 className="grid-title">Grid Lights II</h1>

      <div className="button-section">
        <button onClick={resetGrid} data-testid="reset-btn">
          Reset Grid
        </button>
      </div>

      <div data-testid="grid-lights">
        {Array.from({ length: GRID_SIZE }, (_, rowIdx) => (
          <div className="row" key={rowIdx}>
            {Array.from({ length: GRID_SIZE }, (_, colIdx) => {
              const index = rowIdx * GRID_SIZE + colIdx;
              return (
                <div
                  key={index}
                  className="cell col"
                  onClick={() => handleClick(index)}
                  data-testid={`cell-${index}`}
                ></div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
