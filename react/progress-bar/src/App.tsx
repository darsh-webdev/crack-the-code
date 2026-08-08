import { useEffect, useState } from "react";
import "./App.css";

const ProgressBar = ({ progress }: { progress: number }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  useEffect(() => {
    setTimeout(() => setAnimatedProgress(progress), 100);
  }, [progress]);

  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{
          // width: `${progress}%`,
          transform: `translateX(${animatedProgress - 100}%)`,
          color: animatedProgress < 5 ? "white" : "black",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemax={100}
        aria-valuemin={0}
      >
        {progress}%
      </div>
    </div>
  );
};

function App() {
  const bars = [0, 5, 10, 30, 40, 50, 70, 80, 90, 100];
  return (
    <div className="App">
      <h1>Progress Bar</h1>
      {bars.map((value) => (
        <ProgressBar progress={value} />
      ))}
    </div>
  );
}

export default App;
