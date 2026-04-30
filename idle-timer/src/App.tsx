import { useState } from "react";
import { useIdleTimer } from "./useIdleTimer";
import "./App.css";

function App() {
  const [loggedOut, setLoggedOut] = useState(false);

  const { isWarning, resetTimer } = useIdleTimer({
    timeout: 10000, // 10s total idle time
    warningTime: 4000, // show warning 4s before logout
    onLogout: () => {
      setLoggedOut(true);
    },
  });

  if (loggedOut) {
    return (
      <div className="container">
        <h1>You have been logged out ⛔</h1>
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Idle Timer</h1>
      <p>Stay inactive to trigger auto logout.</p>

      {isWarning && (
        <div className="warning">
          <p>You will be logged out soon due to inactivity.</p>
          <button onClick={resetTimer}>Stay Logged In</button>
        </div>
      )}
    </div>
  );
}

export default App;
