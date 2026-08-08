import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <h1>Animated Loading Skeleton</h1>
      <div className="card">
        {loading ? (
          <div className="skeleton-wrapper">
            <div className="skeleton line name"></div>
            <div className="skeleton line bio"></div>
          </div>
        ) : (
          <div className="content">
            <h2>John Doe</h2>
            <p>Full-stack developer at XYZ company</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
