import { useState } from "react";
import { type Product } from "./App";

const ProductCart = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [cart, setCart] = useState(
    initialProducts.map((p) => ({ ...p, qty: 1 })),
  );

  // TODO: Implement functionality to update quantity
  // const updateQty = (id, delta) => {

  // };

  // TODO: Implement functionality to remove products
  // const removeProduct = (id) => {

  // };

  // TODO: Implement coupon functionality
  // const applyCoupon = () => {

  // };

  return (
    <div className="cart-container">
      <h2 data-testid="cart-heading" className="cart-heading">
        🛒 Product Cart
      </h2>

      <div data-testid="cart-product-list">
        {cart.map((item) => (
          <div key={item.id} className="product-card">
            <div className="product-info">
              <h4 data-testid="product-name" className="product-name">
                {item.name}
              </h4>
              <p className="product-description">{item.description}</p>
              <p data-testid="product-price" className="product-price">
                Price: ₹{item.price}
              </p>

              <div className="quantity-controls">
                <span>Quantity:</span>
                {/* TODO: Add functionality to decrease quantity */}
                <button className="dec-btn">-</button>
                <input
                  data-testid="product-qty"
                  type="number"
                  value={item.qty}
                  readOnly
                  className="qty-input"
                />
                {/* TODO: Add functionality to increase quantity */}
                <button className="inc-btn">+</button>
              </div>

              <p
                data-testid="product-discounted-price-label"
                className="subtotal"
              >
                Subtotal: ₹{(item.price * item.qty).toFixed(2)}
              </p>
            </div>

            {/* TODO: Add functionality to remove product */}
            <button data-testid="remove-product-button" className="remove-btn">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="summary-section">
        <div className="coupon-section">
          <label className="coupon-label">Coupon Code:</label>
          <div className="coupon-input-row">
            {/* TODO: Add state management for coupon input */}
            <input
              data-testid="coupon-code-input"
              type="text"
              placeholder="Enter GRAB50 for 50% off"
              className="coupon-input"
            />
            {/* TODO: Add functionality to apply coupon */}
            <button
              data-testid="apply-coupon-button"
              className="apply-coupon-btn"
            >
              Apply
            </button>
          </div>
        </div>

        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal:</span>
            {/* TODO: Calculate dynamic subtotal */}
            <span>
              ₹
              {cart
                .reduce((sum, item) => sum + item.price * item.qty, 0)
                .toFixed(2)}
            </span>
          </div>

          {/* TODO: Show discount when coupon is applied */}

          <div data-testid="total-amount" className="total-row">
            <span>Total:</span>
            {/* TODO: Calculate total with discount applied */}
            <span>
              ₹
              {cart
                .reduce((sum, item) => sum + item.price * item.qty, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
