import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTags = createAsyncThunk("filters/fetchRecipes", async () => {
  const response = await axios.get("https://dummyjson.com/recipes/tags");
  return response.data;
});

export const fetchMeals = createAsyncThunk("filters/fetchMeals", async () => {
  const response = await axios.get("https://dummyjson.com/recipes/meal-types");
  return response.data;
});

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    tags: null,
    meals: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tags = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchMeals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMeals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meals = action.payload;
      })
      .addCase(fetchMeals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default filtersSlice.reducer;
