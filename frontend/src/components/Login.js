import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./Login.module.css";
import Spinner from "./layout/Spinner";
import AuthContext from "../context/authContext";

const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggedIn, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = {
      email,
      password,
    };

    login(userData);
    if (isLoggedIn) {
      navigate("/");
    }

    setLoading(false);
  };

  if (loading) {
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
