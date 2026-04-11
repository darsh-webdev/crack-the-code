import { useState, useEffect } from "react";
import "./App.css";

const generateCaptcha = (length = 5) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  return Array.from({ length }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
};

//Helper function to style each character with a random rotation and skew
const getCharStyle = () => {
  const rotation = Math.floor(Math.random() * 31) - 15;
  const skew = Math.floor(Math.random() * 11) - 5;

  return {
    display: "inline-block",
    transform: `rotate(${rotation}deg) skew(${skew}deg)`,
    margin: "0 2px",
    fontSize: "24px",
    fontWeight: "bold",
    color: "#000",
    textShadow: "1px 1px #ccc",
  };
};

function App() {
  const [captcha, setCaptcha] = useState("");
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setCaptcha(generateCaptcha());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim().toUpperCase() === captcha) {
      setMessage("Correct");
    } else {
      setMessage("Incorrect");
    }
  };

  const resetCaptcha = () => {
    setCaptcha(generateCaptcha());
    setInput("");
    setMessage("");
  };

  return (
    <div className="container" style={{ fontFamily: "monospace" }}>
      <h2>Captcha Generator</h2>

      <div className="captcha-box">
        {captcha.split("").map((char, i) => (
          <span key={i} style={getCharStyle()}>
            {char}
          </span>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter captcha"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={resetCaptcha}>
          Regenerate
        </button>
      </form>

      {message && (
        <p style={{ color: `${message === "Correct" ? "green" : "red"}` }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default App;
