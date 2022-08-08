import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Spinner from "./layout/Spinner";
import {useSelector, useDispatch} from 'react-redux';
import { login } from "../features/auth/authSlice";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const {user, isLoading, isSuccess, message} = useSelector(state => state.auth)

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
   
    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={classes.background}>
      <div className={classes.reg}>
        <form onSubmit={onSubmit}>
          <label className={classes.genLabel} htmlFor="email">
            И-мейл адрес
          </label>
          <input
            className={classes.genInput}
            placeholder="geri_chef@abv.bg"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          ></input>
          <label className={classes.genLabel} htmlFor="password">
            Парола
          </label>
          <input
            className={classes.genInput}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Въведете парола"
            required
          ></input>
          <button className={classes.regButton} type="submit">
            ВЛЕЗ
          </button>
        </form>
        <p>
          Ако все още нямаш регистрация с нас{" "}
          <Link to="/register">регистрирай се тук</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
