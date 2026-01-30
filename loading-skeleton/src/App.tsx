import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1>Animated Loading Skeleton</h1>
      <div className="card">
        {loading ? (
          <div className="skeleton-wrapper">{/* write code here */}</div>
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
