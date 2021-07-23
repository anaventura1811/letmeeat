import React, { useState, useEffect, useCallback } from 'react';
import { formattingMeasuresAndIngredients } from '../../helpers/helperFunctions';
import useRecipes from '../../hooks/UseRecipes';
import Container from './styles';

function RecipeIngredientsInProgress({ recipe, type, id }) {
  const [checkedBox, setCheckedBox] = useState([]);

  const { recipeInProgress, setRecipeInProgress, setIsDisabled } = useRecipes();

  const keysAndValues = Object.entries(recipe);
  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  const { ingredients, measures } = formatting;

  const setIngredients = useCallback((checkLS) => {
    let currentRecipesInProgress = '';
    if (!checkLS.meals[id] && !checkLS.cocktails[id]) {
      switch (type) {
        case 'meals':
          currentRecipesInProgress = {
            ...checkLS,
            meals: {
              ...checkLS.meals,
              [id]: checkLS.meals[id] ? checkLS.meals[id] : [],
            },
          };
          localStorage.setItem('inProgressRecipes',
          JSON.stringify(currentRecipesInProgress));
          break;
        case 'drinks':
          currentRecipesInProgress = {
            ...checkLS,
            cocktails: {
              ...checkLS.cocktails,
              [id]: checkLS.cocktails[id] ? checkLS.cocktails[id] : [],
            },
          };
        localStorage.setItem('inProgressRecipes',
        JSON.stringify(currentRecipesInProgress));
        break;
        default:
          break;
      }
    }
  }, [id, type]);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    const getDataFromLocalStorage = () => {
      const localStorageInProgressRecipes = JSON.parse(
        localStorage.getItem('inProgressRecipes'),
      );
      let currentRecipesInProgress = '';
      if (localStorageInProgressRecipes) {
        setIngredients(localStorageInProgressRecipes);
      }
      if (!localStorageInProgressRecipes) {
        switch (type) {
          case 'meals':
            currentRecipesInProgress = {
              meals: {
                [id]: [],
              },
              cocktails: {},
            };
          localStorage.setItem('inProgressRecipes',
          JSON.stringify(currentRecipesInProgress));
          break;
          case 'drinks':
            currentRecipesInProgress = {
              cocktails: {
                [id]: [],
              },
              meals: {},
            };
          localStorage.setItem('inProgressRecipes',
          JSON.stringify(currentRecipesInProgress));
          break;
          default:
          break;
        }
      }
    };
    getDataFromLocalStorage();
    setRecipeInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));

    return () => {
      cancel = true;
    };
  }, [id, setIngredients, setRecipeInProgress, type]);

  const updateRecipesInProgress = (el, isChecked) => {
    const previousIngredientAdded = type === 'meals'
    ? recipeInProgress.meals[id].filter((item) => item !== el)
    : recipeInProgress.cocktails[id].filter((item) => item !== el);

    let addingRecipe = {};
    if (isChecked) {
      switch (type) {
        case 'meals':
        addingRecipe ={
          ...recipeInProgress,
          meals: { ...recipeInProgress.meals, [id]: [...previousIngredientAdded, el] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(addingRecipe));
        break;
        case 'drinks':
        addingRecipe ={
          ...recipeInProgress,
          cocktails: { ...recipeInProgress.cocktails, [id]: [...previousIngredientAdded, el] },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(addingRecipe));
        break;
        default:
        break;
      }
      setRecipeInProgress(JSON.parse(localStorage.getItem('inProgressRecipes')));
    }
  };

  const handleChange = ({ target }) => {
    if (target.checked) {
      setCheckedBox([...checkedBox, parseInt(target.value, 10)]);
    } else {
      setCheckedBox(checkedBox.filter((check) => check !== parseInt(target.value, 10)));
    }
  };

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    const storageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storageRecipes) {
      switch (type) {
        case 'meals':
          if (storageRecipes.meals[id]) {
            setCheckedBox(storageRecipes.meals[id]);
          }
        break;
        case 'drinks':
          if (storageRecipes.cocktails[id]) {
            setCheckedBox(storageRecipes.cocktails[id]);
          }
        break;
        default:
        break;
      }
    }
    return () => {
      cancel = true;
    };
  }, [id, type]);

  return (
    <Container className="ing">
      { recipeInProgress && ingredients.map((element, index) => (
        <label
          htmlFor={ element }
          key={ index }
          data-testid={ `${index}-ingredient-step`}
          className={ checkedBox.includes(index) ? 'checked' : ''}
        >
          <input
            type="checkbox"
            key={ index }
            id={ element }
            value={ index }
            checked={ checkedBox.includes(index) }
            onChange={ ({ target }) => {
              updateRecipesInProgress(index, target.checked);
              handleChange({ target });
            } }
          />
          {measures[index]}
          {' '}
          { element }
        </label>))}
      
    </Container>
  )
}

export default RecipeIngredientsInProgress;
