//import classes from "./App.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import MainNavigation from "./components/layout/MainNavigation";

import PrivateRoute from "./components/PrivateRoute";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/Login";
import MyProfile from "./components/profile/MyProfile";
import PostRecipe from "./components/recipes/PostRecipe";
import Recipes from "./components/recipes/Recipes";
import SingleRecipe from "./components/recipes/SingleRecipe";
import EditProfile from "./components/profile/EditProfile";

import React from "react";
import UploadFile from "./components/layout/UploadFile";

function App() {
  return (
    <React.Fragment>
      <MainNavigation />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/dobavi" element={<PrivateRoute />}>
          <Route path="/dobavi" element={<PostRecipe />} />
        </Route>
        <Route path="/profil" element={<PrivateRoute />}>
          <Route path="/profil" element={<MyProfile />} />
        </Route>
        <Route path="/profile/:profileId" element={<MyProfile />}></Route>
        <Route path="/profile/edit/:profileId" element={<EditProfile />} />
        <Route path="/recepti" element={<Recipes />}></Route>
        <Route path="/recepti/:id" element={<SingleRecipe />}></Route>
        <Route path="/dobavi/:recipeId" element={<PrivateRoute />}>
          <Route path="/dobavi/:recipeId" element={<PostRecipe />} />
        </Route>


         {/* Testing upload route */}
         <Route path="/upload" element={<UploadFile />}></Route>
      </Routes>

      <Footer />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
