import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState("");
  const [greeting, setGreeting] = useState("");

  const GREETING_MESSAGES = {
    morning: "Good Morning! ☀️",
    afternoon: "Good Afternoon! 🌤️",
    evening: "Good Evening! 🌇",
    night: "Good Night! 🌙✨",
  };

  const updateTimeAndGreeting = () => {
    const currentTime = new Date();

    const hour = currentTime.getHours();
    let greetingMessage = "";

    if (hour >= 5 && hour < 12) {
      greetingMessage = GREETING_MESSAGES.morning;
    } else if (hour >= 12 && hour < 17) {
      greetingMessage = GREETING_MESSAGES.afternoon;
    } else if (hour >= 17 && hour < 21) {
      greetingMessage = GREETING_MESSAGES.evening;
    } else {
      greetingMessage = GREETING_MESSAGES.night;
    }

    setGreeting(greetingMessage);
    setTime(currentTime.toLocaleTimeString());
  };

  useEffect(() => {
    updateTimeAndGreeting();
    const timer = setInterval(updateTimeAndGreeting, 1000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="modal-content"
      style={{
        textAlign: "center",
        padding: "50px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        color: "#333",
      }}
    >
      <h2 className="greeting" data-testid="greeting">
        {greeting}
      </h2>
      <h2 className="updated-time" data-testid="time">
        {time}
      </h2>
    </div>
  );
}

export default App;
