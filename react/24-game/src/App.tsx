import { useEffect } from "react";
import { init, dealNewCards } from "./TwentyFourGame";
import "./App.css";

function App() {
  useEffect(() => {
    init();
    dealNewCards();
  }, []);

  return (
    <main className="app">
      <h1 className="title">
        24 Game
        <small>Use all 4 cards to make 24</small>
      </h1>

      <div id="cards"></div>

      <div className="expr">
        <span id="expression"></span>
        <span className="result" id="result"></span>
      </div>

      <div className="bar">
        <button id="btn-add">+</button>
        <button id="btn-sub">−</button>
        <button id="btn-mul">×</button>
        <button id="btn-div">÷</button>
        <button id="btn-lp">(</button>
        <button id="btn-rp">)</button>
        <button id="btn-undo">Undo</button>
        <button id="btn-clear">Clear</button>
      </div>

      <div className="bar">
        <button id="btn-check">✅ Check</button>
        <button id="btn-new">🆕 New</button>
        <button id="btn-shuffle">🔀 Shuffle</button>
        <button id="btn-giveup">🏳️ Give Up</button>
      </div>

      <div className="history">
        <h4>History</h4>
        <ul id="history"></ul>
      </div>
    </main>
  );
}

export default App;
