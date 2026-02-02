import { useState } from "react";
import "./App.css";

function App() {
  const [rating, setRating] = useState(0);

  return (
    <div className="container">
      <h1>Star Rating</h1>
      <div className="stars-container">
        {[1, 2, 3, 4, 5].map((star, index) => (
          <div
            key={star}
            className={`star ${index < rating ? "filled" : ""}`}
            onClick={() => setRating(star)}
          >
            ★
          </div>
        ))}
      </div>
      <div className="rating-text">Current Rating: {rating}</div>
      <button className="reset-btn" onClick={() => setRating(0)}>
        Reset Rating
      </button>
    </div>
  );
}

export default App;
