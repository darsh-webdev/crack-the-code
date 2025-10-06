import { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [history, setHistory] = useState<string[]>([""]); // start with empty string
  const [currentStep, setCurrentStep] = useState(0);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const newText = e.target.value;

    // remove "future" states if typing after undo
    const newHistory = [...history.slice(0, currentStep + 1), newText];

    setHistory(newHistory);
    setCurrentStep(newHistory.length - 1);
    setText(newText);
  }

  function handleUndo() {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setText(history[prevStep]);
    }
  }

  function handleRedo() {
    if (currentStep < history.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      setText(history[nextStep]);
    }
  }

  return (
    <div className="undoRedo">
      <h1>Undo Redo History</h1>

      <div className="container">
        <textarea value={text} onChange={handleChange} data-testid="textarea" />

        <div className="buttons">
          <button
            onClick={handleRedo}
            className="redo"
            data-testid="redo-button"
            disabled={currentStep === history.length - 1} // disable at last step
          >
            Redo
          </button>

          <button
            onClick={handleUndo}
            className="undo"
            data-testid="undo-button"
            disabled={currentStep === 0} // disable at first step
          >
            Undo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
