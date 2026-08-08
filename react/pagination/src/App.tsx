import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

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

const PAGE_SIZE = 10;

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=500").then(
      (res) => res.json()
    );

    setProducts(data.products);
  };

  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const goToPrevPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  const goToNextPage = () => {
    if (currentPage === noOfPages - 1) return;
    setCurrentPage((prev) => prev + 1);
  };

  return !products.length ? (
    <h1>No Products found</h1>
  ) : (
    <div>
      <h1>Pagination</h1>
      <div className="products-container">
        {products.slice(start, end).map((product) => (
          <div key={product.id}>
            <ProductCard image={product.thumbnail} title={product.title} />
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <button
          className="page-number"
          onClick={goToPrevPage}
          disabled={currentPage === 0}
        >
          <FaChevronCircleLeft size={20} />
        </button>
        {[...Array(noOfPages).keys()].map((num) => (
          <button
            key={num}
            className={`page-number ${currentPage === num && "active"}`}
            onClick={() => setCurrentPage(num)}
          >
            {num}
          </button>
        ))}
        <button
          className="page-number"
          onClick={goToNextPage}
          disabled={currentPage === noOfPages - 1}
        >
          <FaChevronCircleRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
