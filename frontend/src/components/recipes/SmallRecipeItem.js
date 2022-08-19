import React from "react";
import { Link, useNavigate} from "react-router-dom";
import classes from "./SmallRecipeItem.module.css";
import Button from '../layout/Button'
import Line from "../layout/Line";

const SmallRecipeItem = ({ recipe }) => {
  const recipeExcerpt = recipe.preparation.substring(0, 150) + "...";
  const user = recipe.user

  return (
    <React.Fragment>
      <div className={classes.recipesList}>
        <img className={classes.smallPic}
          src={require(`../../../public/uploads/${recipe.photos}`)}
          alt="chicken-breast"
        ></img>
        <div>
          <h4 className={classes.recipeTitle}>{recipe.title}</h4>
          <Line />
          {/* <Link to={`/profile/${user}`}>Виж</Link> */}
          <p className={classes.recipeExerpt}>{recipeExcerpt}</p>
          <div className={classes.btnDiv}>
          <Link className={classes.btn} to={`/recepti/${recipe._id}`}>ВИЖ ПОВЕЧЕ</Link>
          </div>
          
          
        </div>
        
      </div>
    </React.Fragment>
  );
};

export default SmallRecipeItem;
