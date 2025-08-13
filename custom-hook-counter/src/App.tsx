import { useState } from "react";
import "./App.css";
import usePrevious from "./usePrevious";

function App() {
  const [currentCount, setCurrentCount] = useState(0);
  const previousCount = usePrevious(currentCount);

  const handleIncrement = () => {
    setCurrentCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCurrentCount((prev) => prev - 1);
  };

  const handleReset = () => {
    setCurrentCount(0);
  };

  return (
    <div>
      <h1>Previous Count Custom Hook</h1>
      <div className="container">
        <h2>Current Count: {currentCount}</h2>
        <h2>Previous Count: {previousCount}</h2>
        <div className="btns-container">
          <button onClick={handleIncrement} className="increment">
            Increment
          </button>
          <button onClick={handleDecrement} className="decrement">
            Decrement
          </button>
          <button onClick={handleReset} className="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
