import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const RecipesContext = createContext({});

const MAX_RECIPES = 12;
function RecipesContextProvider(props) {
  const { children } = props;

  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredDataType, setType] = useState({});
  const [searchBarFilters, setSearchBarFilters] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
      
    }
  } 
}