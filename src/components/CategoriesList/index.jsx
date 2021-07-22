import React, { useState, useEffect } from 'react';
import useFetchRecipes from '../../hooks/UseFetchRecipes';


const mealsCategoriesEndpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const drinksCategoriesEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const MAX_CATEGORIES = 6;
function CategoriesList({ type }) {
  const fetchCategoriesURL = type === 'meals' ? mealsCategoriesEndpoint : drinksCategoriesEndpoint;
  const [, setFetchUrl] = useFetchRecipes(type);
  const [categories, setCategories] = useState([]);
  const [lastCategoryClicked, setLastCategoryClicked] = useState('');

  useEffect(() => {
    let cancel = false;
    if (cancel) return;

    const fetchCategories = async () => {
      const response = await fetch(fetchCategoriesURL);
      const data = await response.json();
      const treatedData = data[type]
        .slice(0, MAX_CATEGORIES)
        .map((category) => category.strCategory);
      setCategories(treatedData);
    }
    fetchCategories();
    return () => {
      cancel = true;
    }
  }, [fetchCategoriesURL, type]);

  const handleCategoryClick = (category) => {
    if (lastCategoryClicked !== category && category !== 'All') {
      const fetchRecipesByCategoryUrl = type === 'meals'
					? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
					: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
      setLastCategoryClicked(category);
      return setFetchUrl(`${fetchRecipesByCategoryUrl}${category}`);
    }

    if (category === 'All') {
      setLastCategoryClicked('All');
    } else {
      setLastCategoryClicked('');
    }

    if (type === 'meals') return setFetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    return setFetchUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  };

  if (categories.length === 0) return 'Loading categories...';

  return (
    <div>
      { categories.map((category, index) => (
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
      </button>
      
    </div>
  )
}

export default CategoriesList;
