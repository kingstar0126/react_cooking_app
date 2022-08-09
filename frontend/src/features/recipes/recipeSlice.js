import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import recipeService from "./recipeService";

const initialState = {
  recipes: [],
  recipe: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// CREATE new ticket
export const createRecipe = createAsyncThunk(
  "auth/create",
  async (recipe, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.addRecipe(recipe, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const recipeSlice = createSlice({
  name: "recipe",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
        .addCase(createRecipe.pending, (state => {
            state.isLoading = true
        }))
        .addCase(createRecipe.fulfilled, (state => {
            state.isLoading = false
            state.isSuccess = true
        }))
        .addCase(createRecipe.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
