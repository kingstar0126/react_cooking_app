//import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Footer from "./components/layout/Footer";
import MainNavigation from "./components/layout/MainNavigation";

import Register from "./components/Register";
import Home from "./components/Home";

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
      </Routes>

      <Footer />
    </Fragment>
  );
}

export default App;
