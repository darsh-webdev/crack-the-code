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
  return (
    <div className="container">
      <h1>Image Carousel</h1>
      <div className="carousel">
        {images.map(
          (image, index) =>
            index === currentIndex && (
              <img
                key={image.src}
                src={image.src}
                alt={image.alt}
                className="carousel-image"
              />
            ),
        )}
      </div>
    </div>
  );
}

export default App;
