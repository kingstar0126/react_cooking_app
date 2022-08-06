import classes from "./SingleIngredient.module.css";

const SingleIngredient = ({ product }) => {
  return (
    <div>
      <h2>
        {product.item} - {product.volume} {product.type}
      </h2>
    </div>
  );
};

export default SingleIngredient;
