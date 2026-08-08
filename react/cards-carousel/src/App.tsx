import Carousel from "./Carousel";
import "./App.css";

const cards = [
  { title: "Card 1", description: "Description for Card 1" },
  { title: "Card 2", description: "Description for Card 2" },
  { title: "Card 3", description: "Description for Card 3" },
];

function App() {
  return (
    <div className="app-container">
      <h1>Cards Carousel</h1>
      <Carousel cards={cards} />
    </div>
  );
}

export default App;
