import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import recipeReducer from "../features/recipes/recipeSlice";
import commentReducer from "../features/recipes/commentSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    recipe: recipeReducer,
    comment: commentReducer,
  },
});
