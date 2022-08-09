import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import recipeReducer from "../features/recipes/recipeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer,
  },
});
