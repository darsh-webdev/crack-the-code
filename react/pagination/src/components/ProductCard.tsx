const ProductCard = ({ image, title }: { image: string; title: string }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} className="product-img" />
      <p>{title}</p>
    </div>
  );
};

export default ProductCard;
