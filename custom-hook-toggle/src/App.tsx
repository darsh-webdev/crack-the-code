import { useState, useCallback } from "react";
import "./App.css";

/**
 * useToggle React Hook
 * @param {boolean} initialValue (optional)
 * @returns [value: boolean, toggle: ()=>void]
 */
function useToggle(initialValue = false): [boolean, () => void] {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle];
}

function App() {
  // ✅ Use the custom hook inside this component
  const [isOn, toggle] = useToggle(false);

  return (
    <div>
      <h1>Toggle Button with Custom Hook</h1>
      <button data-testid="toggle-button" onClick={toggle}>
        {isOn ? "ON" : "OFF"}
      </button>
    </div>
  );
}

export default App;
