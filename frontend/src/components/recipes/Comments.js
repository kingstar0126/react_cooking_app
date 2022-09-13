import classes from "./Comments.module.css";

const Comments = ({ comment }) => {
  return (
    <div>
      {comment ? (
        <p>{comment}</p>
      ) : (
        <p className={classes.first}>
          Все още няма нито един коментар към тази рецепта, добави първия :)
        </p>
      )}
    </div>
  );
};

export default Comments;
