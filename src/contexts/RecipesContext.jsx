import React, { useState, createContext } from 'react';
// import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const RecipesContext = createContext({});

const MAX_RECIPES = 12;
function RecipesContextProvider(props) {
  const { children } = props;

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredDataType, setType] = useState({});
  const [searchBarFilters, setSearchBarFilters] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [fetchRecipesContext, setFetchRecipesContext] = useState({});

  const [inputSearch, setInputSearch] = useState('');
	const [radioValue, setRadioValue] = useState('');

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
      toast.error('Sorry, no recipe found', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
    }
  };

  const alertMessage = () => {
		toast.error('Your search must have only one(1) character', {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
		});
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
  }

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
	};

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  )
}

export default RecipesContextProvider;