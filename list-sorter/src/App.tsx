import ListSorter from "./ListSorter";
import "./App.css";

// Default list passed as prop
const defaultFruits = [
  "Banana",
  "Apple",
  "Cherry",
  "Mango",
  "Blueberry",
  "Kiwi",
  "Pineapple",
  "Fig",
];

function App() {
  return <ListSorter initialList={defaultFruits} />;
}

export default App;
