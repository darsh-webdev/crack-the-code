/*
Problem Statement: Create a React component that displays a paragraph of text
and allows users to expand and collapse it. The component should display a truncated 
version of the text by default, with a button to toggle between "Read More" and
"Read Less". This improves readability and user experience for long content blocks.
*/

import { useState } from "react";
import "./App.css";

function App() {
  const [isExpanded, setIsExpanded] = useState(false);

  const text = `React is a popular JavaScript library developed by Facebook for 
  building user interfaces, especially single-page applications. It allows
  developers to create reusable UI components that efficiently update and 
  render as data changes. One of React’s key features is the virtual DOM, 
  which improves performance by minimizing direct manipulation of the actual
  DOM.`;

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="readmore-container">
      <h1 className="title">Read More Toggle</h1>
      <p className="readmore-text" data-testid="readmore-text">
        {isExpanded ? text : text.slice(0, 100) + "..."}
      </p>
      <button
        className="readmore-button"
        data-testid="readmore-button"
        onClick={handleToggle}
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}

export default App;
