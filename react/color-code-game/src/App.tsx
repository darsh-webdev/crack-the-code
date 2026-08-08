import { useState } from "react";
import "./App.css";

// helper functions:
const getRandomHexColor = () => {
  const color = Math.floor(Math.random() * 0xffffff).toString(16);
  return "#" + color.padStart(6, "0");
};

const generateColorOptions = (correctColor: string) => {
  const options = new Set([correctColor]);
  while (options.size < 3) {
    options.add(getRandomHexColor());
  }

  return Array.from(options).sort(() => Math.random() - 0.5);
};

const createGame = () => {
  const correctColor = getRandomHexColor();
  return {
    correctHexColor: correctColor,
    colorOptions: generateColorOptions(correctColor),
    result: "",
    isGameOver: false,
  };
};

function App() {
  const [game, setGame] = useState(createGame);
  const { colorOptions, correctHexColor, isGameOver, result } = game;

  const newGame = () => {
    setGame(createGame());
  };

  const handleColorClick = (selectedColor: string) => {
    if (isGameOver) return;
    setGame((prevGame) => ({
      ...prevGame,
      result: selectedColor === correctHexColor ? "Correct!" : "Incorrect!",
      isGameOver: true,
    }));
  };

  return (
    <div className="game-container">
      <h1>Color Codes</h1>
      <h3 className="color-code">{correctHexColor}</h3>
      <h3>What is this color?</h3>
      <div className="color-options">
        {colorOptions.map((color) => (
          <div
            key={color}
            className="color-box"
            role="button"
            aria-label={`Color option ${color}}`}
            style={{ backgroundColor: color }}
            tabIndex={0}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
      {result && <div className="feedback">{result}</div>}
      {isGameOver && (
        <div>
          <button className="play-again-btn" onClick={newGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
