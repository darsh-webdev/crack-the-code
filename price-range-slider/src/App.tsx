import { useState } from "react";
import "./App.css";

const MIN = 0;
const MAX = 10000;
const STEP = 100;

function App() {
  const [minVal, setMinVal] = useState(2000);
  const [maxVal, setMaxVal] = useState(8000);

  const handleMinChange = (e) => {};
  const handleMaxChange = (e) => {};

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
              onChange={handleMinChange}
            />
          </div>
          <div>
            <label htmlFor="max-input">Max Price:</label>
            <input
              data-testid="input-max"
              type="number"
              value={maxVal}
              onChange={handleMaxChange}
            />
          </div>
        </div>

        <div className="slider-track">
          <div
            className="slider-active-range"
            style={{ left: `${minVal}`, width: `${maxVal - minVal}` }}
          ></div>
          {/* Labels */}
          <div className="slider-label" data-testid="label-min">
            ₹{minVal}
          </div>
          <div className="slider-label" data-testid="label-max">
            ₹{maxVal}
          </div>
          {/* Sliders */}
          <input
            data-testid="slider-min"
            type="range"
            value={minVal}
            onChange={handleMinChange}
            className="thumb thumb--left"
          />
          <input
            data-testid="slider-max"
            type="range"
            value={maxVal}
            onChange={handleMaxChange}
            className="thumb thumb--right"
          />
        </div>

        {/* Track fill placeholder */}
        <div data-testid="slider-track-fill"></div>
      </div>
    </>
  );
}

export default App;
