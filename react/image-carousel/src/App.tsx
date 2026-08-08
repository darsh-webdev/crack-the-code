import { useState } from "react";
import "./App.css";

const images = [
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel1.jpg",
    alt: "nature",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel2.jpg",
    alt: "Beach",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel3.jpg",
    alt: "Yak",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel4.jpg",
    alt: "Hay",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel5.jpg",
    alt: "Plants",
  },
  {
    src: "https://do6gp1uxl3luu.cloudfront.net/question-webp/image-carousel6.jpg",
    alt: "Building",
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  if (!images || images.length === 0) {
    return (
      <div className="container">
        <h1>No images available.</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Image Carousel</h1>
      <div className="carousel">
        {/* Previous Button */}
        <button
          id="Previous"
          className="nav-button left"
          onClick={handlePrevious}
        >
          ←
        </button>

        {/* Image */}
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          className="carousel-image"
        />

        {/* Next Button */}
        <button id="Next" className="nav-button right" onClick={handleNext}>
          →
        </button>
      </div>

      {/* Dots */}
      <div className="dots">
        {images.map((_, index) => (
          <button
            key={index}
            id={`pageButton-${index}`}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToImage(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
