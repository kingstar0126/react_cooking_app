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

// CREATE new recipe
export const createRecipe = createAsyncThunk(
  "recipe/create",
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

// UPDATE existing recipe
export const updateRes = createAsyncThunk(
  "recipe/update",
  async (recipe, recipeId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.updateRecipe(recipe, recipeId, token);
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

// GET user's recipes
export const getMyRecipes = createAsyncThunk(
  "recipe/getAllMy",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await recipeService.getMine(token);
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

// GET all recipes
export const getAllRecipes = createAsyncThunk(
  "recipe/getAll",
  async (_, thunkAPI) => {
    try {
      return await recipeService.getAllRecipes();
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

// GET Single Recipe
export const getSingleRecipe = createAsyncThunk(
  "recipe/getRecipe",
  async (recipeId, thunkAPI) => {
    try {
      return await recipeService.getSingle(recipeId);
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

// DELETE recipe
export const deleteRes = createAsyncThunk(
  "recipe/deleteRecipe",
  async (recipeId, thunkAPI) => {
    const token = thunkAPI.getState().auth.user.token;
    try {
      return await recipeService.deleteRecipe(recipeId, token);
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
      .addCase(createRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRecipe.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // GET my recipes
      .addCase(getMyRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipes = action.payload;
      })
      .addCase(getMyRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // GET all recipes/ public
      .addCase(getAllRecipes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllRecipes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipes = action.payload;
      })
      .addCase(getAllRecipes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // GET Single recipe/ public
      .addCase(getSingleRecipe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRecipe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipe = action.payload;
      })
      .addCase(getSingleRecipe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // DELETE recipe/ private
      .addCase(deleteRes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteRes.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.recipe = {};
      })
      .addCase(deleteRes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = recipeSlice.actions;
export default recipeSlice.reducer;
