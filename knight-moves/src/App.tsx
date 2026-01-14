import { useState } from "react";
import "./App.css";

const boardSize = 8;

const getKnightMoves = (row: number, col: number) => {
  if (row < 0 || row >= boardSize || col < 0 || col >= boardSize) return [];

  const isValidMove = (row: number, col: number) =>
    row >= 0 && row < boardSize && col >= 0 && col < boardSize;

  const knightOffsets = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
  ];

  return knightOffsets
    .map(([dRow, dCol]) => [row + dRow, col + dCol])
    .filter(([row, col]) => isValidMove(row, col));
};

function App() {
  const [hovered, setHovered] = useState<number[] | null>(null);

  const knightMoves = hovered ? getKnightMoves(hovered[0], hovered[1]) : [];

  const isHoveredSquare = (row: number, col: number) => {
    return hovered && hovered[0] === row && hovered[1] === col;
  };

  const isKnightMove = (row: number, col: number) =>
    knightMoves.some(([r, c]) => r === row && c === col);

  const renderBoard = () => {
    const board = [];
    for (let row = 0; row < boardSize; row++) {
      for (let col = 0; col < boardSize; col++) {
        const isLight = (row + col) % 2 === 0;
        let cellClasses = `cell ${isLight ? "light" : "dark"}`;

        if (isHoveredSquare(row, col)) {
          cellClasses += " hovered";
        } else if (isKnightMove(row, col)) {
          cellClasses += " knight-move";
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
            {isHoveredSquare(row, col) && <div className="knight-icon">♞</div>}
          </div>
        );
      }
    }
    return board;
  };

  return (
    <>
      <h1>Knight Moves</h1>
      <div className="board">{renderBoard()}</div>
    </>
  );
}
export default App;
