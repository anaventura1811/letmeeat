import React, { useState, useEffect } from 'react';
import useRecipes from '../../hooks/UseRecipes';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import Card from '../Card/Card';
import CardListContainer from './styles';

function CardList({ recipes, type }) {
  const { getFilteredRecipes,
    filteredRecipes,
    filteredDataType,
    searchBarFilters } = useRecipes();
  
  const [recipesByFilter, setRecipesByFilter] = useState([]);

  useEffect(() => {
    let cancel = false;
    const getRecipes = async () => {
      await getFilteredRecipes(type);
      if (cancel) return;
      setRecipesByFilter(filteredRecipes);
    };
    getRecipes();
    return () => {
      cancel = true;
    }
  }, [filteredRecipes, getFilteredRecipes, type, searchBarFilters, filteredDataType]);

  // if (recipes.length === 0) {
  //   return 'Loading...';
  // }

  const dataType = Object.keys(filteredDataType);

  if (recipesByFilter.length === 1) {
    const recipe = filteredRecipes.find((el) => el === filteredRecipes[0]);

    return dataType[0] === 'meals' ? (
      <Redirect
        to={ { 
          pathname: `/meals/${recipe.idMeal}`,
          state: { recipe, type: dataType[0]}
        }}
      />
    ) : (
      <Redirect
        to={ {
          pathname: `/drinks/${recipe.idDrink}`,
          state: { recipe, type: dataType[0] }
        }}
      />
    );
  }
  
  return (
    <CardListContainer>
      { recipesByFilter.length > 1 ? (
        recipesByFilter.map((recipe, index ) => (
          <Link
            to={ { pathname: type === 'meals' ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}`}}
            key={ index }
          >
            <Card recipe={ recipe } index={ index } />
          </Link>
        ))
      
      ) : (recipes.length > 0 && recipes.map((recipe, i) => (
        <Link
          to={{ pathname: type === 'meals' ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}`}}
          key={ i }
        >
          <Card recipe={ recipe } index={ i } />
        </Link>
      ))

      )}
    </CardListContainer>
  )
}

export default CardList;
