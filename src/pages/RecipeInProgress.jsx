import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import RecipeInfo from '../components/RecipeInfo';
import RecipeIngredientsInProgress from '../components/RecipeIngredientsInProgress';
import useRecipes from '../hooks/UseRecipes';

function RecipeInProgress({ type }) {
  const { id } = useParams();
  const history = useHistory();
  const endpointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	const endpointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [recipe, setRecipe] = useState({});
  const { handleFetch, isLoading, recipeData, fetchMealRecipes } = useRecipes();



  useEffect(() => {
		let cancel = false;
		if (cancel) return;
		const getRecipe = () => {
			if (type === 'meals') {
				 handleFetch(endpointMeal, type);
         return setRecipe(recipeData);
			}
			handleFetch(endpointDrink, type);
      return setRecipe(recipeData);
		};
		getRecipe();
		return () => {
			cancel = true;
		};
	}, [endpointDrink, endpointMeal, fetchMealRecipes, handleFetch, recipeData, type]);


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
      <RecipeIngredientsInProgress
        recipe={ recipe }
        type={ type }
        id={ id }
      />
    </div>
  )
}

export default RecipeInProgress;
