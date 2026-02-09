import { useState } from "react";
import "./App.css";

type Product = {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  price: number;
  description: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    rating: 4.8,
    reviews: 1247,
    price: 199.99,
    description: "High-quality wireless headphones with noise cancellation",
  },
  {
    id: 2,
    name: "Smart Watch",
    rating: 4.2,
    reviews: 892,
    price: 299.99,
    description: "Fitness tracking smartwatch with heart rate monitor",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    rating: 3.9,
    reviews: 456,
    price: 79.99,
    description: "Portable speaker with 12-hour battery life",
  },
  {
    id: 4,
    name: "Gaming Mouse",
    rating: 4.6,
    reviews: 2341,
    price: 89.99,
    description: "Precision gaming mouse with RGB lighting",
  },
  {
    id: 5,
    name: "USB-C Cable",
    rating: 2.1,
    reviews: 123,
    price: 19.99,
    description: "Fast charging USB-C cable, 6ft length",
  },
  {
    id: 6,
    name: "Laptop Stand",
    rating: 4.4,
    reviews: 678,
    price: 49.99,
    description: "Adjustable aluminum laptop stand for ergonomics",
  },
  {
    id: 7,
    name: "Phone Case",
    rating: 3.2,
    reviews: 234,
    price: 29.99,
    description: "Protective case with shock absorption",
  },
  {
    id: 8,
    name: "Tablet",
    rating: 4.7,
    reviews: 1456,
    price: 399.99,
    description: "10-inch tablet with high-resolution display",
  },
  {
    id: 9,
    name: "Keyboard",
    rating: 4.1,
    reviews: 567,
    price: 129.99,
    description: "Mechanical keyboard with blue switches",
  },
  {
    id: 10,
    name: "Webcam",
    rating: 3.8,
    reviews: 345,
    price: 89.99,
    description: "HD webcam with built-in microphone",
  },
  {
    id: 11,
    name: "Monitor",
    rating: 4.5,
    reviews: 1234,
    price: 249.99,
    description: "24-inch 4K monitor with IPS panel",
  },
  {
    id: 12,
    name: "Desk Lamp",
    rating: 3.6,
    reviews: 189,
    price: 39.99,
    description: "LED desk lamp with adjustable brightness",
  },
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getRatingColor = (rating: number) => {
    // - 4.5+ rating: Green (#4CAF50)
    // - 4.0+ rating: Light Green (#8BC34A)
    // - 3.5+ rating: Yellow (#FFC107)
    // - 3.0+ rating: Orange (#FF9800)
    // - Below 3.0: Red (#F44336)

    if (rating >= 4.5) {
      return "#4CAF50";
    } else if (rating >= 4.0) {
      return "#8BC34A";
    } else if (rating >= 3.5) {
      return "#FFC107";
    } else if (rating >= 3.0) {
      return "#FF9800";
    } else {
      return "#F44336";
    }
  };

  const getRatingIntensity = (rating: number) => {
    // - Higher ratings should have higher intensity (opacity)
    // - Lower ratings should have lower intensity
    if (rating >= 4.5) {
      return 1.0;
    } else if (rating >= 4.0) {
      return 0.8;
    } else if (rating >= 3.5) {
      return 0.6;
    } else if (rating >= 3.0) {
      return 0.4;
    } else {
      return 0.2;
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // - Check if click target is the backdrop itself
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  const renderStars = (rating: number) => {
    // - Full stars for whole numbers
    // - Half star for 0.5 ratings
    // - Empty stars to fill up to 5
    // - Return array of star elements
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>,
      );
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span
          key={fullStars + i + (hasHalfStar ? 1 : 0)}
          className="star empty"
        >
          ☆
        </span>,
      );
    }

    return stars;
  };

  return (
    <div className="heatmap-container" role="main">
      <h1>Product Rating Heatmap</h1>
      <p className="subtitle">
        Click on any product to see detailed information
      </p>

      <div className="product-grid" data-testid="product-grid">
        {products.map((product) => {
          const color = getRatingColor(product.rating);
          const intensity = getRatingIntensity(product.rating);

          return (
            <div
              key={product.id}
              className="product-item"
              data-testid="product-item"
              onClick={() => handleProductClick(product)}
              style={{
                backgroundColor: color,
                opacity: intensity,
              }}
            >
              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-rating">
                  {renderStars(product.rating)}
                  <span className="rating-number">{product.rating}</span>
                </div>
                <p className="product-price">${product.price}</p>
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && selectedProduct && (
        <div
          className="modal-backdrop"
          onClick={handleBackdropClick}
          data-testid="product-modal"
        >
          <div className="modal-content">
            <button
              className="close-button"
              onClick={handleCloseModal}
              aria-label="Close modal"
            >
              ×
            </button>

            <div className="modal-header">
              <h2>{selectedProduct.name}</h2>
              <div className="modal-rating">
                {renderStars(selectedProduct.rating)}
                <span className="rating-number">{selectedProduct.rating}</span>
              </div>
            </div>

            <div className="modal-body">
              <div className="product-stats">
                <div className="stat-item">
                  <span className="stat-label">Price:</span>
                  <span className="stat-value">${selectedProduct.price}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Reviews:</span>
                  <span className="stat-value">
                    {selectedProduct.reviews.toLocaleString()}
                  </span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Rating:</span>
                  <span className="stat-value">
                    {selectedProduct.rating}/5.0
                  </span>
                </div>
              </div>

              <div className="product-description">
                <h3>Description</h3>
                <p>{selectedProduct.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
