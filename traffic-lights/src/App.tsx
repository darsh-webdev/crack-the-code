import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [currentLight, setCurrentLight] = useState("red");

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setCurrentLight((prevLight) => {
          if (prevLight === "red") return "yellow";
          if (prevLight === "yellow") return "green";
          return "red";
        });
      },
      currentLight === "red" ? 3000 : currentLight === "green" ? 2000 : 1000,
    );

    return () => clearTimeout(timer);
  }, [currentLight]);

  return (
    <div className="container">
      <h2 data-testid="title">Traffic Lights</h2>
      <div
        className="traffic-light"
        id="traffic-light"
        data-testid="traffic-light"
      >
        <div
          id="red-light"
          data-testid="red-light"
          className={`circle ${currentLight === "red" && "red-on"}`}
        ></div>
        <div
          id="yellow-light"
          data-testid="yellow-light"
          className={`circle ${currentLight === "yellow" && "yellow-on"}`}
        ></div>
        <div
          id="green-light"
          data-testid="green-light"
          className={`circle ${currentLight === "green" && "green-on"}`}
        ></div>
      </div>
    </div>
  );
}

export default App;
