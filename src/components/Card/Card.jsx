import React from 'react';

function Card({ index, recipe }) {
  // const recipeCategory = recipe.strAlcoholic || recipe.strCategory;
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
  
  return (
    <div>
      <div data-testid={ `${index}-recipe-card` }>
        <div className="img-wrapper">
          <img
            data-testid={ `${index}-card-img` }
            src={ recipeThumb }
            alt="Delicious food/drink"
          />
        </div>
        <div className="card-info">
          <p data-testid={`${index}-card-name`}>{ recipeName }</p>
        </div>
      </div>
      
    </div>
  );
}

export default Card;
