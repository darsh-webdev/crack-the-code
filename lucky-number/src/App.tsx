import { useState } from "react";
import "./App.css";

function App() {
  const [inputNumber, setInputNumber] = useState<number | string>("");
  const [message, setMessage] = useState("");

  const isPrime = (num: number): boolean => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputNumber(value ? parseInt(value) : "");

    const digits = value.split("").map(Number);
    const sumOfDigits = digits.reduce((acc, digit) => acc + digit, 0);

    if (isPrime(sumOfDigits)) {
      setMessage(`Lucky Number`);
    } else {
      setMessage(`Not a Lucky Number`);
    }
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
          data-testid="input-box"
        />
      </div>

      <div className="result" data-testid="result">
        {message}
      </div>
    </div>
  );
}

export default App;
