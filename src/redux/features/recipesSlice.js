import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (skip) => {
    const response = await axios.get(
      `https://dummyjson.com/recipes?limit=10&skip=${skip}&sortBy=id&order=asc`
    );
    return response.data;
  }
);

export const fetchTagsRecipes = createAsyncThunk(
  "recipes/fetchTagsRecipes",
  async (tag) => {
    const response = await axios.get(
      `https://dummyjson.com/recipes/tag/${tag}`
    );
    return response.data;
  }
);

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: null,
    total: 0,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.recipes;
        state.total = action.payload.total;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchTagsRecipes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTagsRecipes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recipes = action.payload.recipes;
        state.total = action.payload.total;
      })
      .addCase(fetchTagsRecipes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default recipesSlice.reducer;
