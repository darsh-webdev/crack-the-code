import { useState } from "react";
import "./App.css";

function App() {
  const [diceRoll, setDiceRoll] = useState<number | null>(null);

  const handleRollDice = () => {
    const roll = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
    setDiceRoll(roll);
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Dice Roller</h1>
        <button className="roll-btn" onClick={handleRollDice}>
          Roll Dice
        </button>
        {diceRoll ? <h2>🎲 {diceRoll}</h2> : <h2>Click to roll!</h2>}
      </div>
    </>
  );
}

export default App;
