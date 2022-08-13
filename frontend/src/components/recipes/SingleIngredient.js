import classes from "./SingleIngredient.module.css";

const SingleIngredient = ({ product }) => {
  return (
    <div className={classes.center}>
      <p className={classes.product_name}>
        {product.item} - {product.volume} {product.type}
      </p>
    </div>
  );
};

export default SingleIngredient;
