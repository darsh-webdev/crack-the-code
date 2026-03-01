import { useState } from "react";
import "./App.css";

function App() {
  const [inputNumber, setInputNumber] = useState<number | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputNumber(value ? parseInt(value) : null);
  };

  return (
    <div className="container">
      <div>
        <h1>Lucky Number</h1>
        <p>A number is Lucky if the sum of its digits is a Prime Number </p>
      </div>

      <div>
        <input
          className="input-box"
          type="number"
          placeholder="Enter a number"
          value={inputNumber}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default App;
