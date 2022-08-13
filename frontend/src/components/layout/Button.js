import classes from "./Button.module.css";

const Button = (props) => {
  return <button className={classes.btn}>{props.btnText}</button>;
};

export default Button;
