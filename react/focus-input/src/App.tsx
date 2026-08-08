import { useRef } from "react";
import "./App.css";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="container">
      <h1>Focus Input</h1>
      <input type="text" ref={inputRef} placeholder="Type here" />
      <button className="focus-btn" onClick={focusInput}>
        Focus Input
      </button>
    </div>
  );
}

export default App;
