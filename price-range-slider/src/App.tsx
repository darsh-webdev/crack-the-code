import { useState } from "react";
import "./App.css";

const MIN = 0;
const MAX = 10000;
const STEP = 100;

function App() {
  const [minVal, setMinVal] = useState(2000);
  const [maxVal, setMaxVal] = useState(8000);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), maxVal - STEP);
    setMinVal(value);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), minVal + STEP);
    setMaxVal(value);
  };

  const getPercent = (value: number) => ((value - MIN) / (MAX - MIN)) * 100;
  const minPercent = getPercent(minVal);
  const maxPercent = getPercent(maxVal);

  return (
    <>
      <h2 className="title">Price Range Slider</h2>

      <div className="slider-container">
        <div className="inputs">
          {/* Inputs */}
          <div>
            <label htmlFor="min-input">Min Price:</label>
            <input
              data-testid="input-min"
              type="number"
              value={minVal}
              min={MIN}
              max={MAX}
              step={STEP}
              onChange={handleMinChange}
            />
          </div>
          <div>
            <label htmlFor="max-input">Max Price:</label>
            <input
              data-testid="input-max"
              type="number"
              value={maxVal}
              min={MIN}
              max={MAX}
              step={STEP}
              onChange={handleMaxChange}
            />
          </div>
        </div>

        <div className="slider-track">
          <div
            className="slider-active-range"
            style={{
              left: `${minPercent}%`,
              width: `${maxPercent - minPercent}%`,
            }}
          />
          {/* Labels */}
          <div
            className="slider-label"
            data-testid="label-min"
            style={{ left: `${minPercent}%` }}
          >
            ₹{minVal}
          </div>
          <div
            className="slider-label"
            data-testid="label-max"
            style={{ left: `${maxPercent}%` }}
          >
            ₹{maxVal}
          </div>
          {/* Sliders */}
          <input
            data-testid="slider-min"
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={minVal}
            onChange={handleMinChange}
            className="thumb thumb--left"
          />
          <input
            data-testid="slider-max"
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={maxVal}
            onChange={handleMaxChange}
            className="thumb thumb--right"
          />
        </div>
      </div>
    </>
  );
}

export default App;
