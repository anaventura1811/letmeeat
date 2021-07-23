import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import RecipeInfo from '../components/RecipeInfo';
import useRecipes from '../hooks/UseRecipes';

function RecipeInProgress({ type }) {
  const { id } = useParams();
  const history = useHistory();
  const endpointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	const endpointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [recipe, setRecipe] = useState({});
  const { handleFetch, isLoading, recipeData, recommendations, fetchMealRecipes } = useRecipes();



  useEffect(() => {
		let cancel = false;
		if (cancel) return;
		const getRecipe = () => {
			if (type === 'meals') {
				return handleFetch(endpointMeal, type);
			}
			return handleFetch(endpointDrink, type);
		};
		getRecipe();
		return () => {
			cancel = true;
		};
	}, [endpointDrink, endpointMeal, fetchMealRecipes, handleFetch, type]);


  if (isLoading) {
		return 'Loading';
	}

  const recipeName = recipe.strMeal || recipe.strDrink;
	const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
	const recipeCategory = recipe.strCategory;
	const isAlchooholic = recipe.strAlcoholic || '';
	const renderCategory = type === 'drinks' ? isAlchooholic : recipeCategory;
  
  return (
    <div>
      <RecipeInfo
        recipeName={ recipeName }
        recipeThumb={ recipeThumb }
        type={ type }
        recipe={ recipe }
        recipeCategory={ renderCategory }
      />
    </div>
  )
}

export default RecipeInProgress;
