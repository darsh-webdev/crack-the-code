import { useState } from "react";
import "./App.css";
import recipesData from "./recipesData";
import RecipeCard from "./components/RecipeCard";

const ratings = [
  { string: "4.0+", value: 4.0 },
  { string: "4.3+", value: 4.3 },
  { string: "4.5+", value: 4.5 },
  { string: "4.7+", value: 4.7 },
  { string: "4.9", value: 4.9 },
];

function App() {
  const [cartCount, setCartCount] = useState(0);
  const [selectedRating, setSelectedRating] = useState(ratings[0].value);

  const addToCart = () => {
    setCartCount((prev) => prev + 1);
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRating(parseFloat(e.target.value));
  };

  const filteredRecipes = recipesData.filter(
    (recipe) => recipe.rating >= selectedRating
  );

  const avgRating = (
    filteredRecipes.reduce((acc, recipe) => acc + recipe.rating, 0) /
    (filteredRecipes.length || 1)
  ).toFixed(2);

  return (
    <div>
      <h1>🍽️ Recipe Explorer</h1>
      <div className="filter-cart-container">
        <div className="ratings-filter">
          <label htmlFor="rating">Filter by Rating: </label>
          <select
            name="rating"
            id="rating"
            value={selectedRating}
            onChange={handleRatingChange}
          >
            {ratings.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.string}
              </option>
            ))}
          </select>
        </div>
        <div className="cart">
          <span>🛒 Cart Items: {cartCount}</span>
        </div>
      </div>

      <div>
        <h3>
          Average Rating: {avgRating} ({filteredRecipes.length} recipes)
        </h3>
      </div>
      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} addToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}

export default App;
