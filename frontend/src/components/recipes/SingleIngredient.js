import classes from "./SingleIngredient.module.css";
import { FaMinus } from "react-icons/fa";

const SingleIngredient = ({ product, products, onProductsUpdate }) => {
  const onDelete = (e) => {
    e.preventDefault();
    const productIndex = products.indexOf(product);
    products.splice(productIndex, 1);
    console.log(products);
    onProductsUpdate(products);
  };

  return (
    <div className={classes.center}>
      <p className={classes.product_name}>
        {product.item} - {product.volume} {product.type}
      </p>
      <button className={classes.remove} onClick={onDelete}>
        <FaMinus />
      </button>
    </div>
  );
};

export default SingleIngredient;
