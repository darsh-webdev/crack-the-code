/*
Problem Statement: Create a React counter component with increment,
decrement and reset functionalities.
*/

import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  const handleIncrement = () => {
    setCounter((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCounter((prev) => prev - 1);
  };

  const handleReset = () => {
    setCounter(0);
  };

  return (
    <div>
      <h1>Counter App</h1>
      <div className="container">
        <h2>Counter: {counter}</h2>
        <div className="btns-container">
          <button onClick={handleIncrement} className="increment">
            Increment
          </button>
          <button
            onClick={handleDecrement}
            className="decrement"
            disabled={counter === 0}
          >
            Decrement
          </button>
          <button
            onClick={handleReset}
            className="reset"
            disabled={counter === 0}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
