import React, { useState, useEffect } from 'react';
import StarRating from '../components/StarRating';
import RecipeInfo from '../components/RecipeInfo';
import { useParams } from 'react-router-dom';
import useRecipes from '../hooks/UseRecipes';
import Container from '../styles/recipeDetails';

const endpointRecipes = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const endpointCocktails = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function RecipeDetails({ type }) {
  const { id } = useParams();
  const endpointMeal = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const endpointDrink = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const [singleRecipe, setRecipe] = useState({});
  const { handleFetch, isLoading,
    recipeData, recommendations, fetchMealRecipes } = useRecipes();
  
 useEffect(() => {
		let cancel = false;
		if (cancel) return;
		const getRecipesAndRecommendations = () => {
			if (type === 'meals') {
				fetchMealRecipes(endpointCocktails, type);
				return handleFetch(endpointMeal, type);
			}
			fetchMealRecipes(endpointRecipes, type);
			return handleFetch(endpointDrink, type);
		};
		getRecipesAndRecommendations();
		return () => {
			cancel = true;
		};
 }, [endpointDrink, endpointMeal, fetchMealRecipes, handleFetch, type]);

  useEffect(() => {
		let cancel = false;
		const settingUp = () => {
			if (cancel) return;
			setRecipe(recipeData);
		};
		settingUp();
		return () => {
			cancel = true;
		};
  }, [recipeData, recommendations, type]);

  if (isLoading) {
		return 'Loading';
	}

  const isAlchooholic = singleRecipe.strAlcoholic || '';
	// const magicNumber = 32;
	// const youTubeVideo = singleRecipe.strYoutube || '';
	// const recipeMealName = singleRecipe.strMeal;
	const recipeThumb = singleRecipe.strMealThumb || singleRecipe.strDrinkThumb;
	const recipeCategory = singleRecipe.strCategory;
	const recipeName = type === 'meals' ? singleRecipe.strMeal : singleRecipe.strDrink;
  
  const renderCategory = type === 'drinks' ? isAlchooholic : recipeCategory;
  return (
    <Container>
      <RecipeInfo 
        recipeThumb={ recipeThumb }
        recipeName={ recipeName} 
        type={ type }
        recipe={ singleRecipe }
        recipeCategory={ renderCategory }
      />
    <StarRating />
    </Container>
  )
}

export default RecipeDetails;

