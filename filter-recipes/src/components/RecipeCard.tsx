import type { RecipeData } from "../recipesData";

type RecipeCardProps = RecipeData & {
  addToCart: () => void;
};

const RecipeCard = ({
  name,
  image,
  cuisine,
  rating,
  reviewCount,
  addToCart,
}: RecipeCardProps) => {
  return (
    <div className="recipe-card">
      <div className="img-container">
        <img src={image} alt="name" />
      </div>
      <h2 className="title">{name}</h2>
      <p>🍴 Cuisine: {cuisine}</p>
      <p>
        ⭐️ Rating: {rating} ({reviewCount} reviews)
      </p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default RecipeCard;
