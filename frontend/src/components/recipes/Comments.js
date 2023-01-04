import classes from "./Comments.module.css";

const Comments = ({ comment }) => {
  return (
    <div className={classes.comments__section}>
      <p>{comment.name}</p>
      <p>{comment.comment}</p>
    </div>
  );
};

export default Comments;
