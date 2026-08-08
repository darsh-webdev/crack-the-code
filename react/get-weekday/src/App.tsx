import { useState } from "react";
import "./App.css";

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function App() {
  const [selectedDate, setSelectedDate] = useState("");
  const [result, setResult] = useState("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  const getDay = () => {
    setResult(weekdays[new Date(selectedDate).getUTCDay()]);
  };

  return (
    <div className="container">
      <h1>Get Weekday</h1>
      <input
        type="date"
        data-testid="date-input"
        value={selectedDate}
        onChange={(e) => handleDateChange(e)}
      />
      <button data-testid="find-day-btn" onClick={getDay}>
        Find Day
      </button>
      {result && (
        <p
          className="result"
          data-testid="result"
        >{`That date falls on ${result}`}</p>
      )}
    </div>
  );
}

export default App;
