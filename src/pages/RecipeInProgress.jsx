import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import RecipeInfo from '../components/RecipeInfo';
import RecipeIngredientsInProgress from '../components/RecipeIngredientsInProgress';
import useRecipes from '../hooks/UseRecipes';
import RecipeInProgressContainer from '../styles/recipeInProgress';
import RecipeInstructions from '../components/RecipeInstructions';
import { handleDoneRecipesLS } from '../helpers/localStorageService';

function RecipeInProgress({ type }) {
  const { id } = useParams();
  const history = useHistory();
  const endpointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
	const endpointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [recipe, setRecipe] = useState({});
  const { handleFetch, isLoading, recipeData, fetchMealRecipes, isDisabled } = useRecipes();



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

  const handleRedirectToDoneRecipes = (ev) => {
		ev.preventDefault();
    handleDoneRecipesLS(id, type, recipe)
		history.push('/done-recipes');
	};


  if (isLoading) {
		return 'Loading';
	}

  const recipeName = recipe.strMeal || recipe.strDrink;
	const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
	const recipeCategory = recipe.strCategory;
	const isAlchooholic = recipe.strAlcoholic || '';
	const renderCategory = type === 'drinks' ? isAlchooholic : recipeCategory;
  
  return (
		<RecipeInProgressContainer>
			<RecipeInfo
				recipeName={recipeName}
				recipeThumb={recipeThumb}
				type={type}
				recipe={recipe}
				recipeCategory={renderCategory}
			/>
			<RecipeIngredientsInProgress recipe={recipe} type={type} id={id} />
			<RecipeInstructions recipe={recipe} />
      
      <button
        type='submit'
        data-testid='finish-recipe-btn'
        className='recipe-btn'
        disabled={ isDisabled }
        onClick={(ev) => handleRedirectToDoneRecipes(ev)}
      >
        Finish Recipe
      </button>

		</RecipeInProgressContainer>
	);
}

export default RecipeInProgress;
