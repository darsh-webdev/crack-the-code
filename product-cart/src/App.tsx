import ProductCart from "./ProductCart";
import "./App.css";

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

const initialProducts: Product[] = [
  { id: 1, name: "Shampoo", description: "Gentle and refreshing", price: 200 },
  { id: 2, name: "Soap", description: "Fragrant and foamy", price: 50 },
  { id: 3, name: "Toothpaste", description: "Whitening and minty", price: 100 },
  { id: 4, name: "Conditioner", description: "Smooth and silky", price: 150 },
];

function App() {
  return <ProductCart initialProducts={initialProducts} />;
}

export default App;
