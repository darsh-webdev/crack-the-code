import { useState } from "react";
import "./App.css";

const TOTAL = 9;
const GRID_SIZE = 3;

function App() {
  const [activeCells, setActiveCells] = useState(new Set());
  const [activationOrder, setActivationOrder] = useState<number[]>([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleClick = (index: number) => {
    if (isDeactivating || activeCells.has(index)) return;
    const updatedSet = new Set(activeCells);
    updatedSet.add(index);

    const updatedOrder = [...activationOrder, index];
    setActiveCells(updatedSet);
    setActivationOrder(updatedOrder);

    if (updatedSet.size === TOTAL) {
      setInterval(() => {
        startReverseDeactivation(updatedOrder);
      }, 300);
    }
  };

  const startReverseDeactivation = (order: number[]) => {
    setIsDeactivating(true);
    const reverse = [...order].reverse();

    reverse.forEach((cellIndex, index) => {
      setTimeout(() => {
        setActiveCells((prev) => {
          const copy = new Set(prev);
          copy.delete(cellIndex);
          return copy;
        });

        if (index === reverse.length - 1) {
          setTimeout(() => {
            setIsDeactivating(false);
            setActivationOrder([]);
          }, 100);
        }
      }, index * 300);
    });
  };

  const resetGrid = () => {
    setActiveCells(new Set());
    setActivationOrder([]);
    setIsDeactivating(false);
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
                  className={`cell col ${
                    activeCells.has(index) ? "active" : ""
                  }`}
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
