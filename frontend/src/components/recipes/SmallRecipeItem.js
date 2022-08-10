import React from "react";
import { Link } from "react-router-dom";
import classes from "./SmallRecipeItem.module.css";

const SmallRecipeItem = ({ recipe }) => {
  const recipeExcerpt = recipe.preparation.substring(0, 150) + "...";

  return (
    <React.Fragment>
      <div className={classes.recipesList}>
        <img
          src={require(`../../assets/chicken-breast.jpg`)}
          alt="chicken-breast"
        ></img>
        <div>
          <h4 className={classes.recipeTitle}>{recipe.title}</h4>
          <p className={classes.recipeExerpt}>{recipeExcerpt}</p>
        </div>
        <Link to={`/recepti/${recipe._id}`}>ВИЖ ПОВЕЧЕ</Link>
      </div>
    </React.Fragment>
  );
};

export default SmallRecipeItem;
