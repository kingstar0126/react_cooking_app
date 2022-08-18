import classes from "./SingleIngredient.module.css";
import { FaMinus } from "react-icons/fa";

const SingleIngredient = ({ product, products, onProductsUpdate, edit }) => {
  const onDelete = (e) => {
    
    onProductsUpdate(product.item);
  };
  return (
    <div className={classes.center}>
      <p className={classes.product_name}>
        {product.item} - {product.volume} {product.type}
      </p>
      {edit ? (
        <button className={classes.remove} onClick={onDelete}>
          <FaMinus />
        </button>
      ) : null}
    </div>
  );
};

export default SingleIngredient;
