import { useEffect, useState } from "react";
import "./App.css";

const messages = [
  "Hello, welcome to the typewriter effect!",
  "This demonstrates useEffect and setInterval in React.",
  "Watch as each character appears one by one.",
  "You can skip the animation if you're impatient!",
  "Thanks for watching the typewriter in action!",
];

function App() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showSkip, setShowSkip] = useState(false);

  const startTyping = () => {
    // TODO: Implement start typing logic
  };

  const skipTyping = () => {
    // TODO: Implement skip typing logic
  };

  const nextMessage = () => {
    // TODO: Implement next message logic
  };

  // TODO: Implement useEffect with setInterval for typewriter effect
  useEffect(() => {
    // TODO: Add setInterval logic here
  }, []);

  return (
    <div className="typewriter-container">
      <h1>Typewriter Effect</h1>

      <div className="message-display">
        <p className="displayed-text">{displayedText}</p>
        {isTyping && <span className="cursor">|</span>}
      </div>

      <div className="controls">
        <button onClick={startTyping} className="start-button">
          Start
        </button>

        {showSkip && (
          <button onClick={skipTyping} className="skip-button">
            Skip
          </button>
        )}

        <button onClick={nextMessage} className="next-button">
          Next
        </button>
      </div>

      <div className="message-info">
        <p>
          Message {currentMessageIndex + 1} of {messages.length}
        </p>
        <p className="instruction">
          Watch the typewriter effect or use the Skip button to see the full
          message instantly!
        </p>
      </div>
    </div>
  );
}

export default App;
