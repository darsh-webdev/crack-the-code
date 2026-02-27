import { useState } from "react";
import "./App.css";

const calculateWinner = (squares: (string | null)[]) => {
  const lines = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // Diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a] };
    }
  }

  return null;
};

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const result = calculateWinner(squares);
  const isDraw = squares.every(Boolean) && !result;
  const winner = result?.winner;

  const status = winner
    ? `Winner: ${winner}`
    : isDraw
      ? "It's a draw!"
      : `Next Player: ${isXNext ? "X" : "O"}`;

  const handleClick = (index: number) => {
    if (squares[index]) return; // Ignore if square is already filled

    const newSquares = [...squares];
    newSquares[index] = isXNext ? "X" : "O";
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>

      <div id="status">{status}</div>

      <div className="board">
        {squares.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
            disabled={value !== null || isDraw || winner !== undefined}
            id={`cell-${index}`}
          >
            {value}
          </button>
        ))}
      </div>

      <button id="restart" onClick={handleReset} className="restart-button">
        Restart Game
      </button>
    </div>
  );
}

export default App;
