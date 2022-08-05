import React from "react";
import classes from "./SmallRecipeItem.module.css";

const SmallRecipeItem = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <div className={classes.recipesList}>
        <img
          src={require(`../../assets/chicken-breast.jpg`)}
          alt="chicken-breast"
        ></img>
        <div>
          <h4 className={classes.recipeTitle}>{props.name}</h4>
          <p className={classes.recipeExerpt}>
            {props.name} -- {props.weight}
          </p>
        </div>
        <button>ВИЖ ПОВЕЧЕ</button>
      </div>
    </React.Fragment>
  );
};

export default SmallRecipeItem;
