import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (isRunning) {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <>
      <h1>Stopwatch</h1>
      <div className="container">
        <h1>Time: {seconds}s</h1>
        <div className="btn-container">
          <button
            className="btn start-btn"
            onClick={handleStart}
            disabled={isRunning}
          >
            Start
          </button>
          <button
            className="btn stop-btn"
            onClick={handleStop}
            disabled={!isRunning}
          >
            Stop
          </button>
          <button
            className="btn reset-btn"
            onClick={handleReset}
            disabled={seconds === 0}
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
