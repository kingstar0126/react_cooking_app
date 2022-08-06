import React from "react";
import { Link } from "react-router-dom";

import classes from "./MainNavigation.module.css";

const MainNavigation = (props) => {
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
          <li>
            <Link to="/dobavi">ДОБАВИ РЕЦЕПТА</Link>
          </li>
          <li>
            <Link to="/recepti">РЕЦЕПТИ</Link>
          </li>
          <li>
            <Link to="/login">ВЛЕЗ</Link>
          </li>
          <li>
            <Link to="/register">РЕГИСТРАЦИЯ</Link>
          </li>
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
