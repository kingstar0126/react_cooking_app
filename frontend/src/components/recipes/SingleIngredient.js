import classes from "./SingleIngredient.module.css";

const SingleIngredient = ({ product }) => {
  return (
    <div className={classes.center}>
      <h4>
        <span className={classes.product_name}>{product.item}</span> -{" "}
        {product.volume} {product.type}
      </h4>
    </div>
  );
};

export default SingleIngredient;
