import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAuthors = createAsyncThunk(
  "recipes/fetchAuthor",
  async (userId) => {
    const response = await axios.get(`https://dummyjson.com/users/${userId}`);
    return response.data;
  }
);

const authorSlice = createSlice({
  name: "author",
  initialState: {
    author: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthors.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAuthors.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.author = action.payload;
      })
      .addCase(fetchAuthors.rejected, (state, action) => {
        state.status = "failed";
        state.author = {};
        state.error = action.error.message;
      });
  },
});

export default authorSlice.reducer;
