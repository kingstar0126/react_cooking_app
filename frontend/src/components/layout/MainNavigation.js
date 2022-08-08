import React from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const MainNavigation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const onLogout = () => {
    navigate('/')
    console.log('clicked')
    dispatch(logout)
    dispatch(reset)
  }

  const { user } = useSelector((state) => state.auth);
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
              <button onClick={onLogout} to="/" >
                ИЗХОД
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
