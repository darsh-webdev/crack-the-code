/*
  Problem Statement: Create a floating Scroll To Top button in React that appears when
  the user scrolls down the page and, when clicked, smoothly scrolls back to the top.
*/

import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll event listener to toggle visibility
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function scrollToTop() {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="backToTop">
      <h1>Scroll To Top</h1>

      {Array.from({ length: 40 }, (_, index) => index + 1).map((num, index) => (
        <p key={index}>This is paragraph {num}</p>
      ))}
      <div className="container">
        {isVisible && (
          <button
            className="backtotop-btn"
            onClick={scrollToTop}
            data-testid="back-to-top-btn"
          >
            Scroll to Top
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
