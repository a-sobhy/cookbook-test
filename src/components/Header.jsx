import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Logo } from "../logo.svg";
import Dropdown from "../utils/Dropdown";
import { useEffect, useState } from "react";
import { fetchTagsRecipes } from "../redux/features/recipesSlice";
const collectUniqueMealTypes = (recipes) => {
  const mealTypeSet = new Set();

  recipes.forEach((recipe) => {
    recipe.mealType.forEach((mealType) => {
      mealTypeSet.add(mealType);
    });
  });

  return Array.from(mealTypeSet);
};

export const Header = ({ onMenuToggle, setMounted }) => {
  const dispatch = useDispatch();
  const { tags } = useSelector((state) => state.filters);
  const { recipes } = useSelector((state) => state.recipes);

  const [meatlTypes, setMeatlTypes] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedMeal, setSelectedMeal] = useState("");
  useEffect(() => {
    if (recipes) {
      const allTypes = collectUniqueMealTypes(recipes);
      setMeatlTypes(allTypes);
    }
  }, [recipes]);

  useEffect(() => {
    if (Boolean(selectedTag) && selectedTag === "All") {
      setMounted(true);
    } else {
      if (selectedTag) {
        dispatch(fetchTagsRecipes(selectedTag));
      }
    }
    onMenuToggle();
  }, [selectedTag]);

  useEffect(() => {
    if (Boolean(selectedMeal) && selectedMeal === "All") {
      setMounted(true);
    } else {
      if (selectedMeal) {
        dispatch(fetchTagsRecipes(selectedMeal));
      }
    }
  }, [selectedMeal]);
  return (
    <div className="bg-[#db6d53] h-12 py-2 px-4 flex items-center gap-6">
      <button className="menu-button" onClick={onMenuToggle}>
        ☰
      </button>
      <div className="w-11">
        <Logo />
      </div>
      <div className="flex items-center justify-center gap-11">
        {tags && (
          <Dropdown
            items={["All", ...tags]}
            title="Tags"
            setItem={setSelectedTag}
            selected={selectedTag}
          />
        )}
        {meatlTypes && (
          <Dropdown
            items={["All", ...meatlTypes]}
            title="Meals"
            setItem={setSelectedMeal}
            selected={selectedMeal}
          />
        )}
      </div>
    </div>
  );
};
