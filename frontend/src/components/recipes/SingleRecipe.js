import classes from "./SingleRecipe.module.css";
import Spinner from "../layout/Spinner";
import Button from "../layout/Button";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSingleRecipe,
  reset,
  deleteRes,
} from "../../features/recipes/recipeSlice";
import SingleIngredient from "./SingleIngredient";

const SingleRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = useParams();
  const [ingredients, setIngredient] = useState([]);
  const [activeUser, setActiveUser] = useState(false);
  const editMode = false;

  const { user } = useSelector((state) => state.auth);
  const { recipe, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.recipe
  );
  const { products } = recipe;

  useEffect(() => {
    if (user) {
      setActiveUser(user);
    }
  }, [user]);

  useEffect(() => {
    setIngredient(products);
  }, [products]);

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

  const isOwner = activeUser.id === recipe.user;

  const onDelete = (e) => {
    if (isOwner) {
      dispatch(deleteRes(id));
      if (isSuccess) {
        navigate("/");
      }
    }
  };

  const onUpdate = () => {
    navigate(`/dobavi/${id}`);
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className={classes.background}>
      <section className={classes.center}>
        <div className={classes.card}>
          <h1 className={classes.title}>{recipe.title}</h1>
          <div className={classes.line}></div>
          {recipe.photos !== undefined ? (
            <div>
              <img
                className={classes.singlePhoto}
                src={require(`../../../public/uploads/${recipe.photos}`)}
                alt="recipe"
              ></img>
            </div>
          ) : null}
          <div>
            <h2 className={classes.product}>Необходими продукти</h2>
            {ingredients !== undefined
              ? ingredients.map((ingredient) => (
                  <SingleIngredient
                    edit={editMode}
                    key={ingredient.item}
                    product={ingredient}
                  />
                ))
              : null}
          </div>
          <div>
            <p>{recipe.preparation}</p>
          </div>
          <div>
            <div>
              <Button btnText={"Сготви"}></Button>
            </div>
            {isOwner ? (
              <div>
                <button onClick={onUpdate}>РЕДАКТИРАЙ</button>
                <button onClick={onDelete}>ИЗТРИЙ</button>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleRecipe;
