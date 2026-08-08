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
  const [cache, setCache] = useState<Record<string, Recipe>>({});

  // Function to fetch data from API
  const fetchData = async () => {
    // If input already present in cache, return from cache, don't make API call for same input
    if (cache[input]) {
      setResults(cache[input]);
      return;
    }

    const data = await fetch(
      `https://dummyjson.com/recipes/search?q=${input}`
    ).then((res) => res.json());
    setResults(data?.recipes);
    setCache((prev) => ({ ...prev, [input]: data?.recipes }));
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
