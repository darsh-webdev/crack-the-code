import { useEffect, useMemo, useState } from "react";
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

  const currentMessage = useMemo(
    () => messages[currentMessageIndex],
    [currentMessageIndex]
  );

  const startTyping = () => {
    setIsTyping(true);
    setShowSkip(true);
    setDisplayedText("");
  };

  const skipTyping = () => {
    setIsTyping(false);
    setShowSkip(false);
    setDisplayedText(currentMessage);
  };

  const nextMessage = () => {
    const nextMessage = (currentMessageIndex + 1) % messages.length;
    setCurrentMessageIndex(nextMessage);
    setDisplayedText("");
    setIsTyping(false);
    setShowSkip(false);
  };

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      setDisplayedText((prev) => {
        if (prev.length >= currentMessage.length) {
          setIsTyping(false);
          setShowSkip(false);
          return prev;
        }

        return currentMessage.slice(0, prev.length + 1);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentMessage, isTyping]);

  return (
    <div className="typewriter-container">
      <h1>Typewriter Effect</h1>

      <div className="message-display">
        <p className="displayed-text">{displayedText}</p>
        {isTyping && <span className="cursor">|</span>}
      </div>

      <div className="controls">
        <button
          onClick={startTyping}
          className="start-button"
          disabled={isTyping}
        >
          Start Typing
        </button>

        {showSkip && (
          <button onClick={skipTyping} className="skip-button">
            Skip
          </button>
        )}

        <button
          onClick={nextMessage}
          className="next-button"
          disabled={isTyping}
        >
          Next Message
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
