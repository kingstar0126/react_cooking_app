import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const MainNavigation = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <Link to="/">THE COOK MASTER</Link>
      </div>
      <nav>
        <ul className={classes.lis}>
          <li>
            <Link to="/">НАЧАЛО</Link>
          </li>
          {user && (
            <li>
              <Link to="/dobavi">ДОБАВИ РЕЦЕПТА</Link>
            </li>
          )}
          <li>
            <Link to="/recepti">РЕЦЕПТИ</Link>
          </li>
          {!user && (
            <li>
              <Link to="/login">ВЛЕЗ</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/register">РЕГИСТРАЦИЯ</Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/" onClick={onLogout}>
                ИЗХОД
              </Link>
            </li>
          )}
          {user && (
            <li>
              <Link to="/profil">Профил</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
