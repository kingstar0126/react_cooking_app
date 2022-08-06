//import classes from "./App.module.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Footer from "./components/layout/Footer";
import MainNavigation from "./components/layout/MainNavigation";

import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import PostRecipe from "./components/recipes/PostRecipe";

function App() {
  

  const recipes = [
    {
      id: 1,
      name: "1st recipe",
      description: "nice recipe",
    },
    {
      id: 2,
      name: "1st recipe",
      description: "nice recipe",
    },
  ];

  return (
    <Fragment>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home recipes={recipes} />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dobavi" element={<PostRecipe />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </Fragment>
  );
}

export default App;
