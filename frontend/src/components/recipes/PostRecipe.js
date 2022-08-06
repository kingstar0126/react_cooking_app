import classes from "./PostRecipe.module.css";
import { Fragment, useState } from "react";

const PostRecipe = () => {
  const [formData, setFormData] = useState({});

  return (
    <Fragment>
      <main classname={classes.main}>
        <section className="background">
          <section className={classes.content}>
            <div className={classes.title}>
              <h2>Добави своята страхотна рецепта!</h2>
              <div className={classes.line}></div>
            </div>
            <div className={classes.form}>
              <form className={classes.formInside}>
                <input
                  className={`${classes.inpitOpacity} ${classes.inputField}`}
                  type="text"
                  placeholder="Recipe title..."
                  name="title"
                  required
                />
                <p>Ingredients:</p>
                {/* <app-ingredient-list ></app-ingredient-list> */}
                <article className={classes.ingredient}>
                  <input
                    className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="text"
                    placeholder="Carrots, onion, pasta..."
                    name="product"
                    required
                  />
                  <label for="quantity">Quantity</label>
                  <input
                    className={`${classes.inpitOpacity} ${classes.inputField}`}
                    type="number"
                    placeholder="quantity..."
                    name="quantity"
                  />
                  <select name="ingredient-type" id="kilo">
                    <option value="kilo(s).">Kilo(s).</option>
                    <option value="ml.">ml.</option>
                    <option value="piece(s).">Piece(s)</option>
                    <option value="by taste.">By taste</option>
                  </select>
                  <button className={classes.addIngredient}>+</button>
                </article>

                <p>Preparation - Add the Steps for Cooking Your Masterpiece</p>
                <textarea
                  className={classes.inpitOpacity}
                  name="preparation"
                  id="preparation"
                  cols="10"
                  rows="4"
                  required
                ></textarea>

                <p>Add To Categories</p>
                <article className={classes.categories}>
                  <ul className={classes.checkboxItems}>
                    <li className={classes.checkbox}>
                      <input type="checkbox" name="item" required />
                    </li>
                  </ul>
                </article>

                <div className={classes.suitable}>
                  <p>
                    Suitable for
                    <span>
                      <select name="suitableFor" id="suitable" required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="4">4</option>
                        <option value="6">6</option>
                      </select>
                    </span>
                    people.
                  </p>
                </div>

                <button className={classes.buttonMain}>
                  Publish your recipe
                </button>
              </form>
            </div>
          </section>
        </section>
      </main>
    </Fragment>
  );
};

export default PostRecipe;
