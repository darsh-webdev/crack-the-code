import { useState } from "react";
import "./App.css";

const GRID_SIZE = 5;

function App() {
  const [grid, setGrid] = useState(
    Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(0))
  );

  const toggle = (rowIndex: number, colIndex: number) => {
    const directions = [
      [0, 0], // current
      [-1, 0], // top
      [1, 0], // bottom
      [0, -1], // left
      [0, 1], //right
    ];

    setGrid((prevGrid) => {
      const newGrid = prevGrid.map((row) => [...row]);

      directions.forEach(([dx, dy]) => {
        const x = rowIndex + dx;
        const y = colIndex + dy;

        if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE) {
          newGrid[x][y] = newGrid[x][y] === 1 ? 0 : 1;
        }
      });
      return newGrid;
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2>Grid Lights</h2>
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: "flex" }}>
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                onClick={() => toggle(rowIndex, colIndex)}
                role="cell"
                style={{
                  width: 50,
                  height: 50,
                  margin: 2,
                  backgroundColor: cell === 1 ? "gold" : "lightgray",
                  borderRadius: 2,
                  border: "1px solid gray",
                  cursor: "pointer",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
