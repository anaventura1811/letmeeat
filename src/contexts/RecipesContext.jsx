import React, { useState, createContext, useCallback } from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const RecipesContext = createContext({});

const MAX_RECIPES = 20;
const MAX_LENGTH = 6;

function RecipesContextProvider(props) {
	const { children } = props;

	const [filteredRecipes, setFilteredRecipes] = useState([]);
	const [filteredDataType, setType] = useState({});
	const [searchBarFilters, setSearchBarFilters] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const [fetchRecipesContext, setFetchRecipesContext] = useState({});

	const [inputSearch, setInputSearch] = useState('');
	const [radioValue, setRadioValue] = useState('');

	const [recipeData, setRecipe] = useState({}); // a receita da pg detalhes
	const [recommendations, setRecomendations] = useState([]);
	const [isRecommended, setIsRecommended] = useState(false);

	// contexto receitas em progresso
	const [isDisabled, setIsDisabled] = useState(true);
	const [recipeInProgress, setRecipeInProgress] = useState();


  const handleFetch = useCallback(async (url, type) => {
	  try {
		  const request = await fetch(url);
		  const data = await request.json();
		  if (data) setRecipe(data[type][0]);
		// console.log(data[type]);
		  setIsLoading(false);
	  } catch (err) {
		console.log(err);
	  }
  }, []);

  const fetchMealRecipes = useCallback(async (endpoint, type) => {
		// const currRecomendation = type === 'meals' ? 'drinks' : 'meals';
		let currentRecommendation = '';
		if (type === 'meals') currentRecommendation = 'drinks';
		if (type === 'drinks') currentRecommendation = 'meals';
		try {
			const response = await fetch(endpoint);
			const data = await response.json();
			const formattingData = {
				...data,
				[currentRecommendation]: data[currentRecommendation].slice(0, MAX_LENGTH).reverse(),
			};
			if (formattingData[currentRecommendation] !== null) {
				setRecomendations(formattingData[currentRecommendation]);
			}
		} catch (err) {
			console.log(err);
		}
	}, []);

	const fetchFilteredMealRecipes = async (endpoint, type) => {
		try {
			const response = await fetch(endpoint);
			const data = await response.json();
			const formattedData = {
				...data,
				[type]: data[type].slice(0, MAX_RECIPES),
			};

			setType(formattedData);
			setFilteredRecipes(formattedData[type]);
		} catch (err) {
			console.log(err);
			toast.error('Sorry, no recipe found');
		}
	};

	const alertMessage = () => {
		toast.error('Your search must have only one(1) character');
	};

	const handleMealFilterType = (filterType, query, type) => {
		const trimSpacesQuery = query.replace(/\s/g, '').trim();
		const endpointMealIngr = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${trimSpacesQuery}`;
		const endpointMealName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${trimSpacesQuery}`;
		const endpointMealFirstLetter = `https://www.themealdb.com/api/json/v1/1/search.php?f=${trimSpacesQuery}`;

		switch (filterType) {
			case 'ingredient':
				fetchFilteredMealRecipes(endpointMealIngr, type);
				break;
			case 'first-letter':
				if (query.length > 1 || query.trim() === '') {
					alertMessage();
				} else {
					fetchFilteredMealRecipes(endpointMealFirstLetter, type);
				}
				break;
			case 'name':
				fetchFilteredMealRecipes(endpointMealName, type);
				break;
			default:
				break;
		}
	};

	const handleDrinksFilterType = (filterType, query, type) => {
		const trimSpacesQuery = query.replace(/\s/g, '').trim();
		const encodeQuery = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${query}`;
		const cocktailEndpointName = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${trimSpacesQuery}`;
		const cocktailEndpointFirstLetter = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${trimSpacesQuery}`;

		switch (filterType) {
			case 'ingredient':
				return fetchFilteredMealRecipes(encodeQuery, type);
			// fetchFilteredMealRecipes(cocktailEndpointIngr, type);
			// break;
			case 'first-letter':
				if (query.length > 1 || query.trim() === '') {
					alertMessage();
				} else {
					fetchFilteredMealRecipes(cocktailEndpointFirstLetter, type);
				}
				break;
			case 'name':
				fetchFilteredMealRecipes(cocktailEndpointName, type);
				break;
			default:
				break;
		}
	};

	const getFilteredRecipes = (type) => {
		if (searchBarFilters.length > 0) {
			console.log(searchBarFilters);
			searchBarFilters.forEach((item) => {
				console.log(item);
				const { inputSearch, radioValue } = item;
				if (type === 'meals') {
					handleMealFilterType(radioValue, inputSearch, type); // faz o switch case de cada concatenação de busca
				}
				if (type === 'drinks') {
					handleDrinksFilterType(radioValue, inputSearch, type); // faz o switch case de cada concatenação de busca
				}
			});
			setSearchBarFilters([]);
		}
	};

	const contextValue = {
		filteredRecipes,
		filteredDataType,
		setFilteredRecipes,
		searchBarFilters,
		setSearchBarFilters,
		getFilteredRecipes,
		fetchFilteredMealRecipes,
		isLoading,
		setIsLoading,
		fetchRecipesContext,
		setFetchRecipesContext,
		inputSearch,
		setInputSearch,
		radioValue,
		setRadioValue,
		handleFetch,
		recipeData,
		recommendations,
		fetchMealRecipes,
		isRecommended,
		setIsRecommended,
		isDisabled,
		setIsDisabled,
		recipeInProgress,
		setRecipeInProgress,
	};

	return <RecipesContext.Provider value={contextValue}>{children}</RecipesContext.Provider>;
}

export default RecipesContextProvider;