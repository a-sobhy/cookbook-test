import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthors } from "../redux/features/authersSlice";

const RecipeDetail = ({ recipe }) => {
  const dispatch = useDispatch();
  const { author } = useSelector((state) => state.authors);
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    if (Boolean(author)) {
      const authName = `${author.firstName} ${author.lastName}`;
      setAuthorName(authName);
    }
  }, [author]);

  useEffect(() => {
    if (recipe) {
      dispatch(fetchAuthors(recipe.userId));
    }
  }, [recipe]);

  return recipe ? (
    <div className="flex-[3.4] p-3 overflow-y-auto sm:w-full">
      <h2 className="font-bold text-[2rem] text-[#db6d53]">{recipe.name}</h2>
      <div className="flex items-center gap-1 text-[14px] mb-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>

        <p>
          <strong>Author:</strong> {authorName}
        </p>
      </div>
      <div className="recipe-detail-container sm:w-full">
        <div>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="rounded-md w-[35pc]"
          />
        </div>
        <div className="max-w-[30pc]">
          <h3 className="font-bold">Ingredients</h3>
          <ul className="mb-5">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                <strong>{index + 1}-</strong> {ingredient}
              </li>
            ))}
          </ul>
          <h3 className="font-bold">Instructions</h3>
          {recipe.instructions?.map((step, i) => (
            <p>
              <strong>{i + 1}-</strong> {step}
            </p>
          ))}
          {recipe.mealType && (
            <>
              <h3 className="font-bold mt-5">Meal Type</h3>
              <div className="flex gap-2">
                {recipe.mealType?.map((step) => (
                  <span className="text-orange-400">{`>${step}`}</span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="shadow-[0px_0px_7px_-2px_#db6d53] w-full h-[15vh] flex justify-center items-center">
      <h4 className="font-medium">Select a recipe to show its details</h4>
    </div>
  );
};

export default RecipeDetail;
