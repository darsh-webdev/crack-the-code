import { useState } from "react";
import "./App.css";

function App() {
  const [inputDate, setInputDate] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputDate(e.target.value);
  };

  const calculateAge = () => {
    setError("");
    setResult("");
    const currentDate = new Date();

    if (!inputDate) {
      setError("Please select a date");
      return;
    }

    const birthDate = new Date(inputDate);

    if (currentDate < birthDate) {
      setError("Birthdate cannot be in the future");
      return;
    }

    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    // If days go negative, take previous month's days into account
    if (days < 0) {
      months--;
      // Get number of days in the previous month
      const prevMonth = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        0
      );
      days += prevMonth.getDate();
    }

    // If months go negative, subtract one year and add 12 to months
    if (months < 0) {
      years--;
      months += 12;
    }

    setResult(`${years} years, ${months} months, ${days} days`);
  };

  return (
    <div>
      <h1>Age Calculator</h1>
      <div className="container">
        <h2 className="title"></h2>
        <label className="label" data-testid="label-birthdate">
          Enter/Select a birthdate:
        </label>
        <input
          id="birthdate"
          type="date"
          className="input-date"
          data-testid="input-birthdate"
          value={inputDate}
          onChange={handleInputChange}
        />
        <button
          className="btn-calc"
          onClick={calculateAge}
          data-testid="btn-calculate"
        >
          Calculate Age
        </button>
        {error && (
          <p className="error-msg" data-testid="error-msg">
            {error}
          </p>
        )}
        {result && (
          <p className="age-result" data-testid="age-result">
            {result}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
