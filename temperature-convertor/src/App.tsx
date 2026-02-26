import { useState } from "react";
import "./App.css";

type Unit = "Celsius" | "Fahrenheit" | "Kelvin";

function App() {
  const [temperature, setTemperature] = useState<number | "">("");
  const [fromUnit, setFromUnit] = useState<Unit>("Celsius");
  const [toUnit, setToUnit] = useState<Unit>("Fahrenheit");
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const convertTemperature = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (temperature === "") return;

    let celsius: number;

    // Convert → Celsius
    switch (fromUnit) {
      case "Celsius":
        celsius = temperature;
        break;

      case "Fahrenheit":
        celsius = ((temperature - 32) * 5) / 9;
        break;

      case "Kelvin":
        celsius = temperature - 273.15;
        break;

      default:
        throw new Error("Invalid from unit");
    }

    let result: number;

    // Convert Celsius → Target
    switch (toUnit) {
      case "Celsius":
        result = celsius;
        break;

      case "Fahrenheit":
        result = (celsius * 9) / 5 + 32;
        break;

      case "Kelvin":
        result = celsius + 273.15;
        break;

      default:
        throw new Error("Invalid to unit");
    }

    // Round to 2 decimal places safely
    const rounded = Number(result.toFixed(2));

    setConvertedValue(rounded);
  };

  return (
    <div className="temperature-convertor">
      <h1>Temperature Convertor</h1>

      <form className="tempForm">
        <input
          type="number"
          value={temperature}
          onChange={(e) =>
            setTemperature(e.target.value === "" ? "" : Number(e.target.value))
          }
        />

        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value as Unit)}
        >
          <option value="Celsius">Celsius</option>
          <option value="Fahrenheit">Fahrenheit</option>
          <option value="Kelvin">Kelvin</option>
        </select>

        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value as Unit)}
        >
          <option value="Celsius">Celsius</option>
          <option value="Fahrenheit">Fahrenheit</option>
          <option value="Kelvin">Kelvin</option>
        </select>

        <button disabled={temperature === ""} onClick={convertTemperature}>
          Convert
        </button>

        {convertedValue !== null && (
          <p>
            {temperature} {fromUnit} is {convertedValue.toFixed(2)} {toUnit}
          </p>
        )}
      </form>
    </div>
  );
}

export default App;
