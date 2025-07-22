import { useState } from "react";
import "./App.css";

type InputData = {
  loanAmount: string;
  interestRate: string;
  loanTerm: string;
};

function App() {
  const initialData = {
    loanAmount: "",
    interestRate: "",
    loanTerm: "",
  };
  const [inputData, setInputData] = useState<InputData>(initialData);
  const [result, setResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const calculateMortgage = () => {
    const loanAmount = Number(inputData.loanAmount);
    const loanTerm = Number(inputData.loanTerm);
    const interestRate = Number(inputData.interestRate);

    if (loanAmount < 0) {
      setResult("Invalid input");
      return;
    }

    if (interestRate < 0 || interestRate === 0) {
      setResult("Invalid input");
      return;
    }

    if (loanTerm < 1) {
      setResult("Invalid input");
      return;
    }

    const monthlyInterest = interestRate / 12 / 100;
    const numOfMonthlyPayments = loanTerm * 12;

    const mortgage =
      loanAmount *
      ((monthlyInterest * (1 + monthlyInterest) ** numOfMonthlyPayments) /
        ((1 + monthlyInterest) ** numOfMonthlyPayments - 1));

    setResult(mortgage.toFixed(2));
  };

  return (
    <div className="card">
      <h1>Mortgage Calculator</h1>
      <div className="inputs-container">
        <div className="input-field">
          <label>Loan Amount (INR):</label>
          <input
            type="number"
            name="loanAmount"
            min={0}
            value={inputData.loanAmount}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-field">
          <label>Annual Interest Rate(%):</label>
          <input
            type="number"
            name="interestRate"
            min={0}
            value={inputData.interestRate}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="input-field">
          <label>Loan Term (Years):</label>
          <input
            type="number"
            name="loanTerm"
            min={0}
            value={inputData.loanTerm}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <button onClick={calculateMortgage}>Calculate</button>
        {result && (
          <div className="result">
            <span aria-label="result">Monthly Payment: {result}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
