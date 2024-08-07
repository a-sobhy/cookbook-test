import React, { useEffect, useState } from "react";

import "./App.css";
import RecipeList from "./components/RecipeList";
import RecipeDetail from "./components/RecipeDetail";
import { Header } from "./components/Header";
import { useDispatch } from "react-redux";
import { fetchMeals, fetchTags } from "./redux/features/filtersSlice";
function App() {
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      dispatch(fetchTags());
      setMounted(false);
    }
  }, [mounted]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [selectedRecipe]);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <Header onMenuToggle={handleMenuToggle} setMounted={setMounted} />
      <div className={`compo-container ${isMenuOpen ? "menu-open" : ""}`}>
        <RecipeList
          currentRecipe={selectedRecipe}
          onSelectRecipe={setSelectedRecipe}
          mounted={mounted}
          setMounted={setMounted}
          isMenuOpen={isMenuOpen}
        />

        <RecipeDetail recipe={selectedRecipe} />
      </div>
    </>
  );
}

export default App;
