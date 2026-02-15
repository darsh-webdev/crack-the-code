import { useState } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");

  const [height, setHeight] = useState("");

  const [bmi, setBmi] = useState<number | null>(null);

  const [category, setCategory] = useState<string | null>(null);

  const calculateBMI = () => {
    // - Convert inputs to numbers
    const weightNum = Number(weight);
    const heightNum = Number(height);

    if (isNaN(weightNum) || isNaN(heightNum)) return;
    // - Validate they are positive
    if (weightNum <= 0 || heightNum <= 0) return;
    // - Apply BMI formula: weight / ((height / 100) ^ 2)
    const calculatedBMI = weightNum / Math.pow(heightNum / 100, 2);
    // - Round the result
    const roundedBMI = Math.round(calculatedBMI * 10) / 10;
    // - Set BMI and category
    setBmi(roundedBMI);
    setCategory(getCategory(roundedBMI));
  };

  const getCategory = (bmi: number) => {
    // - if bmi < 18.5 => "Underweight"
    // - else if bmi < 24.9 => "Normal"
    // - else if bmi < 29.9 => "Overweight"
    // - else => "Obese"
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal";
    if (bmi < 29.9) return "Overweight";
    return "Obese";
  };

  const reset = () => {
    // - Clear all state values
    setWeight("");
    setHeight("");
    setBmi(null);
    setCategory(null);
  };

  return (
    <div className="container">
      <h2>BMI Calculator</h2>

      <input
        type="text"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
        placeholder="Weight (kg)"
      />

      <input
        type="text"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
        placeholder="Height (cm)"
      />

      <button onClick={calculateBMI}>Calculate BMI</button>

      <button onClick={reset}>Reset</button>

      <div className="result">
        {bmi && (
          <>
            <h3>Your BMI: {bmi}</h3>
            <p>Category: {category}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
