import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentService from "./commentService";

const initialState = {
  comments: [],
  isCommentError: false,
  isCommentSuccess: false,
  isCommentLoading: false,
  messageComment: "",
};

// ADD new comment
export const addComment = createAsyncThunk(
  "recipe/comment",
  async (comment, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await commentService.addComment(comment, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.messageComment ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET all comments
export const getAllComments = createAsyncThunk(
  "recipe/getAllComments",
  async (id, thunkAPI) => {
    try {
      return await commentService.getAllComments(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.messageComment ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Create comment
      .addCase(addComment.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.isCommentLoading = false;
        state.isCommentSuccess = true;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isCommentLoading = false;
        state.isCommentError = true;
        state.messageComment = action.payload;
      })
      // GET all comments/ public
      .addCase(getAllComments.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isCommentSuccess = true;
        state.comments = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.isLoading = false;
        state.isCommentError = true;
        state.messageComment = action.payload;
      });
  },
});

export const { reset } = commentSlice.actions;
export default commentSlice.reducer;
