import { useState } from "react";
import "./App.css";

type Unit = "Celsius" | "Fahrenheit" | "Kelvin";

function App() {
  const [temperature, setTemperature] = useState<number | "">("");
  const [fromUnit, setFromUnit] = useState<Unit>("Celsius");
  const [toUnit, setToUnit] = useState<Unit>("Fahrenheit");
  const [convertedValue, setConvertedValue] = useState<number | null>(null);

  const convertTemperature = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    // Conversion logic
    let celsius: number;

    switch (fromUnit) {
      case "Celsius":
        celsius = temperature as number;
        break;
      case "Fahrenheit":
        celsius = ((temperature as number) - 32) * (5 / 9);
        break;
      case "Kelvin":
        celsius = (temperature as number) - 273.15;
        break;
      default:
        throw new Error("Invalid from unit");
    }

    switch (toUnit) {
      case "Celsius":
        setConvertedValue(celsius);
        return;
      case "Fahrenheit":
        setConvertedValue(celsius * (9 / 5) + 32);
        return;
      case "Kelvin":
        setConvertedValue(celsius + 273.15);
        return;
      default:
        return;
    }
  };

  return (
    <div className="temperature-convertor">
      <h1>Temperature Convertor</h1>
      <p>
        Enter a value and convert it between Celsius, Fahrenheit, and Kelvin.
      </p>

      <form className="tempForm">
        <div className="inputs">
          {/* Add values and onChange Logic*/}
          <input
            data-testid="temperature-input"
            type="number"
            id="temperatureUnit"
            value={temperature}
            onChange={(e) =>
              setTemperature(
                e.target.value === "" ? "" : Number(e.target.value),
              )
            }
          />

          <select
            id="fromUnit"
            data-testid="from-unit"
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value as Unit)}
          >
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Kelvin">Kelvin</option>
          </select>

          <select
            id="toUnit"
            data-testid="to-unit"
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value as Unit)}
          >
            <option value="Celsius">Celsius</option>
            <option value="Fahrenheit">Fahrenheit</option>
            <option value="Kelvin">Kelvin</option>
          </select>

          {/* Make it Disabled , Only Enabled if all values are true */}
          <button
            data-testid="convert-button"
            id="convert-btn"
            disabled={temperature === "" || !fromUnit || !toUnit}
            onClick={(e) => convertTemperature(e)}
          >
            Convert
          </button>
        </div>

        <div>
          {convertedValue !== null && (
            <p id="result">
              {temperature} {fromUnit} is {convertedValue.toFixed(2)} {toUnit}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
