import React, { useState } from "react";
import "./App.css";

function App() {
  // Generate a random number in the range of 1 to 100
  const generateRandom = () => {
    return Math.floor(Math.random() * (100 - 1 + 1)) + 1;
  };

  const [target, setTarget] = useState(generateRandom());
  const [attempts, setAttempts] = useState(1);
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  // Possible output messages
  const OUTPUTS = {
    invalid: "Please enter a number between 1 and 100.",
    low: "Too low! Try again.",
    high: "Too high! Try again.",
  };

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Function to handle guess checking
  const handleGuess = () => {
    const guess = parseInt(input.trim(), 10);

    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 100) {
      setResult(OUTPUTS.invalid);
      return;
    }

    // Check guess
    if (guess < target) {
      setResult(OUTPUTS.low);
      setAttempts((c) => c + 1);
    } else if (guess > target) {
      setResult(OUTPUTS.high);
      setAttempts((c) => c + 1);
    } else {
      setResult(
        `Congratulations! You guessed the number in ${attempts} attempts.`
      );
      setIsGameOver(true);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setAttempts(1);
    setInput("");
    setResult("");
    setTarget(generateRandom());
    setIsGameOver(false);
  };

  return (
    <div
      className="container"
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h2>Guess the Number</h2>
      <input
        placeholder="Enter a number between 1 and 100"
        style={{ width: "300px", padding: "5px" }}
        id="guess-input"
        value={input}
        onChange={handleInputChange}
        type="number"
        disabled={isGameOver}
      />
      <div className="action-btns">
        <button
          className="guess-btn"
          onClick={handleGuess}
          disabled={isGameOver}
        >
          Check Guess
        </button>
        <button className="reset-btn" onClick={resetGame}>
          Reset Game
        </button>
      </div>

      <p className="result">{result}</p>
    </div>
  );
}

export default App;
