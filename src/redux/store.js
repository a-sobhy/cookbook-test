import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./features/recipesSlice";
import authorReducer from "./features/authersSlice";
import filtersSlice from "./features/filtersSlice";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    authors: authorReducer,
    filters: filtersSlice,
  },
});

export default store;
