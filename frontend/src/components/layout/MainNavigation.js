import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/authContext";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

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
          {isLoggedIn && (
            <li>
              <Link to="/dobavi">ДОБАВИ РЕЦЕПТА</Link>
            </li>
          )}
          <li>
            <Link to="/recepti">РЕЦЕПТИ</Link>
          </li>
          {!isLoggedIn && (
            <li>
              <Link to="/login">ВЛЕЗ</Link>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <Link to="/register">РЕГИСТРАЦИЯ</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link onClick={() => logout()} to="/">
                ИЗХОД
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
