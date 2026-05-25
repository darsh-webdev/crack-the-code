import { useState } from "react";
import { type Product } from "./App";

const ProductCart = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [couponCode, setCouponCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [cart, setCart] = useState(
    initialProducts.map((p) => ({ ...p, qty: 1 })),
  );
  const [newProduct, setNewProduct] = useState({
    id: new Date(),
    name: "",
    price: "",
    description: "",
    qty: 1,
  });

  const handleAddProduct = () => {
    if (!newProduct.name.trim() || !newProduct.price.trim()) {
      alert("Please enter valid product name and price.");
      return;
    }

    const price = parseFloat(newProduct.price);
    if (isNaN(price) || price <= 0) {
      alert("Please enter a valid positive number for price.");
      return;
    }

    const newCartItem = {
      id: Date.now(),
      name: newProduct.name,
      description: newProduct.description,
      price: price,
      qty: newProduct.qty,
    };

    setCart((prevCart) => [...prevCart, newCartItem]);
    setNewProduct({
      id: new Date(),
      name: "",
      price: "",
      description: "",
      qty: 1,
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + delta } : item,
      ),
    );
  };

  const removeProduct = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    if (!couponCode.trim())
      alert("Invalid coupon code. Use GRAB50 for 50% discount.");

    if (couponCode.trim().toUpperCase() === "GRAB50") {
      setIsDiscountApplied(true);
    }
  };

  const subTotal = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  const total = cart
    .reduce((sum, item) => sum + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <div className="cart-container">
      <h2 data-testid="cart-heading" className="cart-heading">
        🛒 Product Cart
      </h2>

      <div className="add-product-section">
        <h3 className="add-product-title">Add New Product</h3>
        <div className="add-product-grid">
          <div>
            <label className="form-label" htmlFor="product-name">
              Product Name:
            </label>
            <input
              type="text"
              id="product-name"
              data-testid="new-product-name"
              placeholder="Enter product name"
              className="input-field"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="form-label" htmlFor="product-price">
              Price:
            </label>
            <input
              type="text"
              id="product-price"
              data-testid="new-product-price"
              placeholder="Enter price"
              className="input-field"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="product-quantity" className="form-label">
              Quantity:
            </label>
            <input
              type="text"
              id="product-quantity"
              data-testid="new-product-qty"
              placeholder="Enter quantity"
              className="input-field"
              value={newProduct.qty}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  qty: parseInt(e.target.value) || 1,
                })
              }
            />
          </div>
          <div>
            <label className="form-label" htmlFor="product-description">
              Description:
            </label>
            <input
              type="text"
              id="product-description"
              data-testid="new-product-description"
              placeholder="Enter product description"
              className="input-field"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <div>
            <button
              data-testid="add-product-button"
              className="btn add-btn"
              onClick={handleAddProduct}
            >
              Add Product
            </button>
          </div>
        </div>
      </div>

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
                <button
                  className="dec-btn"
                  onClick={() => updateQty(item.id, -1)}
                  disabled={item.qty <= 1}
                >
                  -
                </button>
                <input
                  data-testid="product-qty"
                  type="number"
                  value={item.qty}
                  readOnly
                  className="qty-input"
                />
                <button
                  className="inc-btn"
                  onClick={() => updateQty(item.id, 1)}
                >
                  +
                </button>
              </div>

              <p
                data-testid="product-discounted-price-label"
                className="subtotal"
              >
                Subtotal: ₹{(item.price * item.qty).toFixed(2)}
              </p>
            </div>

            <button
              data-testid="remove-product-button"
              className="remove-btn"
              onClick={() => removeProduct(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="summary-section">
        <div className="coupon-section">
          <label className="coupon-label">Coupon Code:</label>
          <div className="coupon-input-row">
            <input
              data-testid="coupon-code-input"
              type="text"
              placeholder="Enter GRAB50 for 50% off"
              className="coupon-input"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button
              data-testid="apply-coupon-button"
              className="apply-coupon-btn"
              onClick={applyCoupon}
            >
              Apply
            </button>
          </div>
          {isDiscountApplied && (
            <span className="coupon-success" data-testid="apply-coupon-message">
              GRAB50 coupon applied successfully!
            </span>
          )}
        </div>

        <div className="summary-totals">
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>₹{subTotal}</span>
          </div>

          {isDiscountApplied && (
            <div className="discount-row">
              <span>Discount (GRAB50):</span>
              <span>-₹{(parseFloat(subTotal) * 0.5).toFixed(2)}</span>
            </div>
          )}

          <div data-testid="total-amount" className="total-row">
            <span>Total:</span>
            {isDiscountApplied ? (
              <span>
                ₹{(parseFloat(total) - parseFloat(subTotal) * 0.5).toFixed(2)}
              </span>
            ) : (
              <span>₹{total}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
