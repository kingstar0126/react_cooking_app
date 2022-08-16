import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Home.module.css";
import SmallRecipeItem from "./recipes/SmallRecipeItem";
import Spinner from "./layout/Spinner";
import { getAllRecipes, reset } from "../features/recipes/recipeSlice";
import Button from "./layout/Button";

const Home = () => {
  const { recipes, isLoading, isSuccess } = useSelector(
    (state) => state.recipe
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]);

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [isSuccess, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.recipeMain}>
      <h1 className={classes.recipeOfTheDay}>Рецепта на деня</h1>
      <section className={classes.recipeMain}>
        <h3 className={classes.recipeTitle}>Салатка</h3>
        <div>
          <img
            className={classes.main__recipe__image}
            src={require(`../assets/fresh-salad.jpg`)}
            alt="fresh-salad"
          ></img>
        </div>
        <div>
          <div className={classes.line}></div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
        <Button btnText={"Виж повече"}></Button>
      </section>

      <section>
        <ul className={classes.recipe__list}>
          {recipes.map((recipe) => (
            <SmallRecipeItem key={recipe._id} user={recipe.user} recipe={recipe}></SmallRecipeItem>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Home;
