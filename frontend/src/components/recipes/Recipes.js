import classes from "./Recipes.module.css";

import Spinner from "../layout/Spinner";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllRecipes, reset } from "../../features/recipes/recipeSlice";

import SmallRecipeItem from "./SmallRecipeItem";

const Recipes = () => {
  const dispatch = useDispatch();
  const { recipes, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.recipe
  );

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

    dispatch(getAllRecipes());
    // eslint-disable-next-line
  }, [isError, message]);

  if (isLoading) {
    return <Spinner />;
  }

  console.log(recipes);

  return (
    <main className={classes.background}>
      {recipes.map((recipe) => (
        <div className={classes.recipeBlock}>
          <SmallRecipeItem
            key={recipe._id}
            recipe={recipe}
          ></SmallRecipeItem>
        </div>
      ))}
    </main>
  );
};

export default Recipes;
