import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../redux/features/recipesSlice";
import Pagination from "../utils/Pagination";

const RecipeList = ({
  onSelectRecipe,
  currentRecipe,
  mounted,
  setMounted,
  isMenuOpen,
}) => {
  const dispatch = useDispatch();
  const { recipes, total, status } = useSelector((state) => state.recipes);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (mounted) {
      dispatch(fetchRecipes(skip));
      setMounted(false);
    }
  }, [mounted, skip]);

  useEffect(() => {
    setMounted(true);
  }, [setMounted, skip]);

  const handlePageChange = (newSkip) => {
    if (newSkip !== skip) {
      setSkip(newSkip);
    }
  };

  return (
    <div
      className={`flex-[0.6] v-container transition-transform duration-300 transform ${
        isMenuOpen ? "translate-x-0" : "translate-x-[-110%]"
      } sm:relative sm:translate-x-0`}
    >
      <div className="recipe-items">
        {recipes?.map((recipe) => (
          <div
            key={recipe.id}
            className={`recipe-item ${
              currentRecipe?.id === recipe?.id ? "currentRecipe" : ""
            }`}
            onClick={() => onSelectRecipe(recipe)}
          >
            <img src={recipe.image} alt={recipe.name} />
            <div>
              <h4 className="font-semibold">{recipe.name}</h4>
              {recipe?.mealType?.length > 0 && (
                <div className="meal-types">
                  {recipe?.mealType?.map((type, index) => (
                    <span key={type}>
                      {type}
                      {index < recipe.mealType.length - 1 && "-"}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <Pagination skip={skip} total={total} onPageChange={handlePageChange} />
    </div>
  );
};

export default memo(RecipeList);
