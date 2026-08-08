import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export type Product = {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
};

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error: Error | unknown) {
        setError(error instanceof Error ? error.message : null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (isLoading) return <div>Loading......</div>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="products">
      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="product-image"
            />
            <div className="product-info">
              <h4 className="product-title">{product.title}</h4>
              <p>{product.description.slice(0, 50)}...</p>
              <Link to={`/products/${product.id}`} className="view-more">
                View More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
