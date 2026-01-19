import { useEffect, useState } from "react";
import "./App.css";

const TOTAL = 9;
const GRID_SIZE = 3;

function App() {
  const [activeCells, setActiveCells] = useState(new Set());
  const [activationOrder, setActivationOrder] = useState<number[]>([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const handleClick = (index: number) => {
    if (isDeactivating || activeCells.has(index)) return;
    setActiveCells((prev) => new Set([...prev, index]));
    setActivationOrder((prev) => [...prev, index]);
  };

  const startReverseDeactivation = (order: number[]) => {
    setIsDeactivating(true);
    let i = order.length;

    const intervalId = setInterval(() => {
      setActiveCells((prev) => {
        const newSet = new Set(prev);
        newSet.delete(order[i]);
        return newSet;
      });
      i--;
      if (i < 0) {
        clearInterval(intervalId);
        setIsDeactivating(false);
      }
    }, 300);
  };

  const resetGrid = () => {
    setActiveCells(new Set());
    setActivationOrder([]);
    setIsDeactivating(false);
  };

  useEffect(() => {
    if (activeCells.size === TOTAL) {
      startReverseDeactivation(activationOrder);
    }
  }, [activeCells, activationOrder]);

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
