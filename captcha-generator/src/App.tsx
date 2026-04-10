import { useState, useEffect } from "react";
import "./App.css";

//TODO 1: Write a function that returns a random string of letters and numbers
//TODO 2: When the component loads, generate a new captcha and store input
//TODO 3: Compare user input with the captcha when form is submitted
//TODO 4: When "Regenerate" button is clicked, create a new captcha

const generateCaptcha = (length = 5) => {};

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
    // generate and set captcha here
  }, []);

  const handleSubmit = (e) => {
    // write validation logic here
  };

  const resetCaptcha = () => {
    // regenerate the captcha here
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

      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
