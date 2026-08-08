import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import type { Product } from "./Products";

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProduct(data);
      } catch (error: Error | unknown) {
        setError(error instanceof Error ? error.message : null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [productId]);

  if (isLoading) return <div>Loading......</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="product-details">
      {product ? (
        <div>
          <h3 className="product-title">{product.title}</h3>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
          <p>{product.description}</p>
          <p>
            <strong>Price: </strong>
            {product.price}
          </p>
          <Link to="/products" className="back-to-products">
            Back to products
          </Link>
        </div>
      ) : (
        <div>
          <p>No product Found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
