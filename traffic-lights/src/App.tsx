import "./App.css";

function App() {
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
          className={`circle red-on`}
        ></div>
        <div
          id="yellow-light"
          data-testid="yellow-light"
          className={`circle yellow-on`}
        ></div>
        <div
          id="green-light"
          data-testid="green-light"
          className={`circle green-on`}
        ></div>
      </div>
    </div>
  );
}

export default App;
