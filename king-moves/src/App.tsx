import { useState } from "react";
import "./App.css";

const boardSize = 8;

function App() {
  const [hovered, setHovered] = useState<number[] | null>(null);

  const isHoveredSquare = (row: number, col: number) => {
    return hovered && hovered[0] === row && hovered[1] === col;
  };

  const isKingMove = (row: number, col: number) => {
    if (!hovered) return false;
    const [hr, hc] = hovered;
    const rowDiff = Math.abs(hr - row);
    const colDiff = Math.abs(hc - col);
    return !isHoveredSquare(row, col) && rowDiff <= 1 && colDiff <= 1;
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const isLight = (row + col) % 2 === 0;
        let cellClasses = `cell ${isLight ? "light" : "dark"}`;

        if (isHoveredSquare(row, col)) {
          cellClasses += " hovered";
        } else if (isKingMove(row, col)) {
          cellClasses += " king-move";
        }

        board.push(
          <div
            key={`${row}-${col}`}
            data-testid={`cell-${row}-${col}`}
            className={cellClasses}
            role="gridcell"
            onMouseEnter={() => setHovered([row, col])}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setHovered([row, col])}
          >
            {isHoveredSquare(row, col) && <div className="king-icon">♔</div>}
          </div>
        );
      }
    }
    return board;
  };

  return (
    <>
      <h1>King Moves</h1>
      <div className="board">{renderBoard()}</div>
    </>
  );
}

export default App;
