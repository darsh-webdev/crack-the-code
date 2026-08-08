import { useLocalStorage } from "./useLocalStorage";
import "./App.css";

function App() {
  const [name, setName] = useLocalStorage<string>("name", "");

  return (
    <div className="container">
      <h1>useLocalStorage Hook</h1>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
        className="input"
      />

      <p>
        Stored Value: <strong>{name || "None"}</strong>
      </p>

      <p className="hint">
        Open this page in another tab and update the value, it will sync!
      </p>
    </div>
  );
}

export default App;
