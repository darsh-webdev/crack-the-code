import { useState } from "react";

function Carousel({
  cards,
}: {
  cards: { title: string; description: string }[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="card">
      {cards.length === 0 ? (
        <div>No cards available</div>
      ) : (
        <div>
          <h1 className="card-title">{cards[currentIndex].title}</h1>
          <p className="card-description">{cards[currentIndex].description}</p>
          <div className="btns-container">
            <button
              className="btn"
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
            <p>
              {currentIndex + 1} of {cards.length}
            </p>
            <button
              className="btn"
              onClick={() => setCurrentIndex((prev) => prev + 1)}
              disabled={currentIndex === cards.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carousel;
