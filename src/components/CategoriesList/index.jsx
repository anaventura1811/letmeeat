import React, { useState, useEffect } from 'react';
import useFetchRecipes from '../../hooks/UseFetchRecipes';
import CategoriesListContainer from './styles';


const mealsCategoriesEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinksCategoriesEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const MAX_CATEGORIES = 6;
function CategoriesList({ type }) {
  const fetchCategoriesURL = type === 'meals' ? mealsCategoriesEndpoint : drinksCategoriesEndpoint;
  const [, setFetchUrl] = useFetchRecipes(type);
  const [selectCategoryValue, setSelectCategoryValue] = useState('Choose');
  const [categories, setCategories] = useState([]);
  const [lastCategoryClicked, setLastCategoryClicked] = useState('');

  useEffect(() => {
    let cancel = false;
    if (cancel) return;

    const fetchCategories = async () => {
      const response = await fetch(fetchCategoriesURL);
      const data = await response.json();
      const treatedData = data[type].slice(0, MAX_CATEGORIES).map((category) => category.strCategory);
      setCategories(treatedData);
    }
    fetchCategories();
    return () => {
      cancel = true;
    }
  }, [fetchCategoriesURL, type]);

  const handleDropDownChange = (event) => {
    const { target: { value } } = event;
     setSelectCategoryValue(value);
    if (lastCategoryClicked !== value && value !== 'All') {
      const fetchRecipesByCategoryUrl = type === 'meals'
					? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
					: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
      setLastCategoryClicked(value);
      return setFetchUrl(`${fetchRecipesByCategoryUrl}${value}`);
    }

    if (value === 'All') {
      setLastCategoryClicked('All');
    } else {
      setLastCategoryClicked('');
    }

    if (type === 'meals') return setFetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    return setFetchUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  };


  if (categories.length === 0) return 'Loading categories...';

  return (
    <CategoriesListContainer>
      <select value={ selectCategoryValue} onChange={ handleDropDownChange }>
        <option disabled hidden value="Choose">Find recipes by category</option>
        { categories.map((category, index) => (
          <option
            key={ index }
            value={ category }
            data-testid={ `${category}-category-filter`}
          >
            { category }
          </option>
        ))}
        <option data-testid="All-category-filter" value="All">All</option>
      </select>
      {/* { categories.map((category, index) => (
        <button
          type="button"
          data-testid={ `${category}-category-filter` }
          key={ index }
          onClick={ () => handleCategoryClick(category) }
        >
          { category }
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => handleCategoryClick('All') }
      >
        All
      </button> */}
      
    </CategoriesListContainer>
  )
}

export default CategoriesList;
