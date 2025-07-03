import { useEffect, useState } from "react";
import "./App.css";

type Recipe = {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: "Easy" | "Medium" | "Hard";
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
};

function App() {
  const [results, setResults] = useState<Recipe[]>([]);
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);

  // Function to fetch data from API
  const fetchData = async () => {
    const data = await fetch(
      `https://dummyjson.com/recipes/search?q=${input}`
    ).then((res) => res.json());
    setResults(data?.recipes);
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <>
      <div>
        <h1>Autocomplete Search Bar</h1>
        <div>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for a product..."
            className="search-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onFocus={() => setShowResults(true)}
            onBlur={() => setShowResults(false)}
          />
          {/* Autocomplete results */}
          {showResults && (
            <div className="results-container">
              {results?.map((result) => (
                <span className="result" key={result.id}>
                  {result?.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
