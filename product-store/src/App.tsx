import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <nav className="navbar">
        <div>
          <h3>Product Store</h3>
        </div>
        <div>
          <Link to="/" className="navLink">
            Home
          </Link>{" "}
          <Link to="/products" className="navLink">
            Products
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
      </Routes>
    </>
  );
}

export default App;
