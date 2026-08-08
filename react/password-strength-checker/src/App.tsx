/*
  Problem Statement: Build a password strength checker in React that evaluates and
  displays the strength level of a user's password. The goal of this problem is to
  create a password strength checker that evaluates the strength of a given password
  based on specific criteria. (Mentioned in the Checks array)
*/
import { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import "./App.css";

const checkPasswordStrength = (pwd: string) => {
  const checks = [
    pwd.length >= 8, // Length check
    /[A-Z]/.test(pwd), // At least one uppercase letter
    /[a-z]/.test(pwd), // At least one lowercase letter
    /[0-9]/.test(pwd), // At least one digit
    /[^A-Za-z0-9]/.test(pwd), //At least one special character
  ];

  const passed = checks.filter(Boolean).length;

  if (passed === 1) return "Level 1";
  if (passed >= 2 && passed <= 3) return "Level 2";
  if (passed >= 4 && passed <= 5) return "Level 3";

  return "Weak Password";
};

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleToggle = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleCheck = () => {
    setResult("");
    setResult(checkPasswordStrength(input));
  };

  return (
    <div>
      <h2>Password Strength Checker</h2>

      <div className="container">
        <div className="input-box">
          <label htmlFor="password">Password:</label>
          <div className="password-wrapper">
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="Enter password"
              className="password-input"
              value={input}
              onChange={handleInputChange}
            />
            <span
              className="icon"
              data-testid="toggle-icon"
              onClick={handleToggle}
            >
              {isPasswordVisible ? <Eye size={23} /> : <EyeOff size={23} />}
            </span>
          </div>
        </div>
        <button className="check-btn" onClick={handleCheck}>
          Check Strength
        </button>
        {result && (
          <p className="result">
            <strong>Strength: </strong>
            {result}
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
