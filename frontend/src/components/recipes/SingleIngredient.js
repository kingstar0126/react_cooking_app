import classes from "./SingleIngredient.module.css";

const SingleIngredient = ({ product }) => {
  return (
    <div>
      <h2>
        {product.item} - {product.volume}
      </h2>
    </div>
  );
};

export default SingleIngredient;
