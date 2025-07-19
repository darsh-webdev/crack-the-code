import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta;
  images: string[];
  thumbnail: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500").then(
      (res) => res.json()
    );

    setProducts(data.products);
  };

  return !products.length ? (
    <h1>No Products found</h1>
  ) : (
    <div>
      <h1>Pagination</h1>
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id}>
            <ProductCard image={product.thumbnail} title={product.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
