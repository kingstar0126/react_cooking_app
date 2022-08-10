import classes from "./SingleRecipe.module.css";
import Spinner from "../layout/Spinner";

import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSingleRecipe, reset } from "../../features/recipes/recipeSlice";
import SingleIngredient from "./SingleIngredient";

const SingleRecipe = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = useParams();
  const [ingredients, setIngredient] = useState([]);

  const { recipe, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.recipe
  );
  const { products } = recipe;

  useEffect(() => {
    setIngredient(products);
  }, [products]);
  console.log(ingredients);
  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getSingleRecipe(id));
    // eslint-disable-next-line
  }, [isError, message, id]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className={classes.background}>
      <section className={classes.center}>
        <h1>{recipe.title}</h1>
        <div className={classes.line}></div>
        <div>
          <h2>Необходими продукти</h2>
          {ingredients !== undefined
            ? ingredients.map((ingredient) => (
                <SingleIngredient key={ingredient.item} product={ingredient} />
              ))
            : null}
        </div>
      </section>
    </main>
  );
};

export default SingleRecipe;
