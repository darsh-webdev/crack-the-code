import { useState } from "react";
import "./App.css";

function App() {
  const [imgUrlInput, setImgUrlInput] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleAddImage = () => {
    if (imgUrlInput.trim()) {
      setImages((prev) => [...prev, imgUrlInput]);
      setImgUrlInput(""); // Clear input after adding
    }
  };

  const handleImageClick = (imgUrl: string) => {
    setSelectedImage(imgUrl);
  };

  const handleImageDelete = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  // Close when clicking overlay, but not when clicking the image
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <h1>Image Gallery Application</h1>
      {/* Input for adding a new image */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter image URL"
          className="img-input"
          value={imgUrlInput}
          onChange={(e) => setImgUrlInput(e.target.value)}
        />
        <button className="add-btn" onClick={handleAddImage}>
          Add Image
        </button>
      </div>
      {/* Display images */}
      <div className="img-grid">
        {images.length !== 0 &&
          images.map((imgUrl, index) => (
            <div className="img-item" key={imgUrl}>
              <img
                key={imgUrl}
                src={imgUrl}
                alt="User provided"
                width="250"
                onClick={() => handleImageClick(imgUrl)}
              ></img>
              <button
                className="delete-btn"
                onClick={() => handleImageDelete(index)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>

      {/* Modal for displaying selected image */}
      {selectedImage && (
        <div className="modal-overlay" onClick={handleOverlayClick} id="modal">
          <div className="modal-content">
            <img src={selectedImage} alt="Large view" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
