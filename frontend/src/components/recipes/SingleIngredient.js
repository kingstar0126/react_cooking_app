import classes from "./SingleIngredient.module.css";
import { FaMinus } from "react-icons/fa";

const SingleIngredient = ({
  product,
  products,
  onProductsUpdate,
  edit,
  postRecipe,
}) => {
  const onDelete = (e) => {
    onProductsUpdate(product.item);
  };
  return (
    <div className={`${edit ? classes.center : classes.centered}`}>
      <p
        className={`${classes.product_name} ${postRecipe ? classes.white : ""}`}
      >
        {product.item} - {product.volume} {product.type}
      </p>
      {edit ? (
        <button className={classes.addIngredient} onClick={onDelete}>
          <FaMinus />
        </button>
      ) : null}
    </div>
  );
};

export default SingleIngredient;
