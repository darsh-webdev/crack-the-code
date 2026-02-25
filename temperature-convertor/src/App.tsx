import { useState, useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    // Disabled the Button If Temperature or Fromunit or toUnit is Empty
  }, []);

  const convertTemperature = () => {
    // Conversion logic
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
          />

          <select id="fromUnit" data-testid="from-unit">
            {/* Options */}
          </select>

          <select id="toUnit" data-testid="to-unit">
            {/* Options */}
          </select>

          {/* Make it Disabled , Only Enabled if all values are true */}
          <button data-testid="convert-button" id="convert-btn">
            Convert
          </button>
        </div>

        <div>
          <p id="result"></p>
        </div>
      </form>
    </div>
  );
}

export default App;
