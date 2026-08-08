import { useState } from "react";
import "./App.css";

const boardSize = 8;

function App() {
  const [hovered, setHovered] = useState<number[] | null>(null);

  const isHoveredSquare = (row: number, col: number) => {
    return hovered && hovered[0] === row && hovered[1] === col;
  };

  const isBishopMove = (row: number, col: number) => {
    if (!hovered) return false;
    const [hr, hc] = hovered;
    const rowDifference = Math.abs(hr - row);
    const colDifference = Math.abs(hc - col);
    return !isHoveredSquare(row, col) && rowDifference === colDifference;
  };

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const isLight = (row + col) % 2 === 0;
        let cellClasses = `cell ${isLight ? "light" : "dark"}`;

        if (isHoveredSquare(row, col)) {
          cellClasses += " hovered";
        } else if (isBishopMove(row, col)) {
          cellClasses += " bishop-move";
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
            {isHoveredSquare(row, col) && <div className="bishop-icon">♗</div>}
          </div>
        );
      }
    }
    return board;
  };

  return (
    <>
      <h1>Bishop Moves</h1>
      <div className="board">{renderBoard()}</div>
    </>
  );
}
export default App;
