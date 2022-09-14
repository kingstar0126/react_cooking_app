import classes from "./SingleRecipe.module.css";
import Spinner from "../layout/Spinner";
//import Button from "../layout/Button";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getSingleRecipe,
  reset,
  deleteRes,
} from "../../features/recipes/recipeSlice";
import {
  addComment,
  getAllComments,
} from "../../features/recipes/commentSlice";
import SingleIngredient from "./SingleIngredient";
import Comments from "./Comments";
//import Line from "../layout/Line";

const SingleRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [ingredients, setIngredient] = useState([]);
  const [activeUser, setActiveUser] = useState(false);
  const [newComment, setNewComment] = useState("");
  const editMode = false;

  const { user } = useSelector((state) => state.auth);
  const { recipe, isSuccess, isLoading, isError, message } = useSelector(
    (state) => state.recipe
  );
  const { comments } = useSelector((state) => state.comment);
  const { products } = recipe;

  useEffect(() => {
    dispatch(getAllComments(id));
  }, []);

  console.log(comments);
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

  const onCommentHandler = (e) => {
    setNewComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (newComment.length < 5) {
      toast.error("Коментарът трябва да е минимум 5 символа");
      return;
    }

    const commentData = {
      recipeId: id,
      name: user.name,
      comment: newComment,
    };
    dispatch(addComment(commentData));
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
          <div className={classes.preparation}>
            <p>{recipe.preparation}</p>
          </div>
          <div>
            {/* <div>
              <Button btnText={"Сготви"}></Button>
            </div> */}
            {isOwner ? (
              <div className={classes.buttons}>
                <button className={classes.buttons__warn} onClick={onUpdate}>
                  РЕДАКТИРАЙ
                </button>
                <button className={classes.buttons__red} onClick={onDelete}>
                  ИЗТРИЙ
                </button>
              </div>
            ) : null}
          </div>
        </div>
        <div className={classes.card}>
          {comments !== undefined ? (
            comments.map((comment) => <Comments comment={comment} />)
          ) : (
            <p>Все още няма нито един коментар към тази рецепта</p>
          )}
          {user ? (
            <form onSubmit={onSubmit}>
              <input
                className={`${classes.inpitOpacity} ${classes.inputField}`}
                type="text"
                placeholder="Страхотна рецепта..."
                name="comment"
                id="comment"
                onChange={onCommentHandler}
                required
              />
              <div className={classes.form__button}>
                <button className={classes.button__add}>Добави коментар</button>
              </div>
            </form>
          ) : null}
        </div>
      </section>
    </main>
  );
};

export default SingleRecipe;
