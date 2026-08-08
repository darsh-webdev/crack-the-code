import { useState } from "react";
import "./App.css";

type Card = {
  id: number;
  value: string;
  revealed: boolean;
  matched: boolean;
};

const initialEmojis = ["❤️", "🍀", "🌎", "🍎", "⚽️", "🚗", "⛵️", "💎"];

const shuffleCards = () => {
  return [...initialEmojis, ...initialEmojis]
    .sort(() => Math.random() - 0.5)
    .map((value, id) => ({
      id,
      value,
      revealed: false,
      matched: false,
    }));
};

function App() {
  const [cards, setCards] = useState<Card[]>(shuffleCards()); // Each card: { id, value, revealed, matched }
  const [firstCard, setFirstCard] = useState<Card | null>(null);
  const [secondCard, setSecondCard] = useState<Card | null>(null);
  const [moves, setMoves] = useState(0);

  const won = cards.length > 0 && cards.every((c) => c.matched);

  const handleClick = (card: Card) => {
    if (firstCard && secondCard) return;
    if (card.revealed || card.matched) return; // Ignore clicks on revealed or matched cards

    if (!firstCard) {
      setFirstCard(card);
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, revealed: true } : c)),
      );
    }

    if (firstCard && !secondCard) {
      setSecondCard(card);
      setCards((prev) =>
        prev.map((c) => (c.id === card.id ? { ...c, revealed: true } : c)),
      );
      setMoves((prev) => prev + 1);

      if (firstCard.value === card.value) {
        // Match found
        setCards((prev) =>
          prev.map((c) =>
            c.value === card.value ? { ...c, matched: true } : c,
          ),
        );
        setFirstCard(null);
        setSecondCard(null);
      } else {
        // No match, hide cards after a short delay
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === card.id
                ? { ...c, revealed: false }
                : c,
            ),
          );
          setFirstCard(null);
          setSecondCard(null);
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setCards(shuffleCards());
    setFirstCard(null);
    setSecondCard(null);
    setMoves(0);
  };

  return (
    <div className="game-container">
      <h1>Match Pair Game</h1>
      <div className="grid">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.revealed || card.matched ? "revealed" : ""}`}
            onClick={() => handleClick(card)}
          >
            {card.revealed || card.matched ? card.value : null}
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
