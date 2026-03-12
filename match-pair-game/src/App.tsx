import { useState, useEffect } from "react";
import "./App.css";

const initialEmojis = ["❤️", "🍀", "🌎", "🍎", "⚽️", "🚗", "⛵️", "💎"];

function App() {
  const [cards, setCards] = useState([]); // Each card: { id, value, revealed, matched }
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    // TODO: Shuffle the emoji list and initialize the cards array
  }, []);

  const handleClick = (card) => {
    // TODO: Handle card click logic here
  };

  const resetGame = () => {
    // TODO: Reset the game to initial state
  };

  return (
    <div className="game-container">
      <h1>Match Pair Game</h1>
      <div className="grid">
        {Array.from({ length: 16 }, (_, i) => (
          <div
            key={i}
            className={`card ${cards[i]?.revealed || cards[i]?.matched ? "revealed" : ""}`}
            onClick={() => handleClick(cards[i])}
          >
            {(cards[i]?.revealed || cards[i]?.matched) && cards[i]?.value}
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
      {won && <p className="won">🎉 You won!</p>}
      <button className="reset-button" onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

export default App;
