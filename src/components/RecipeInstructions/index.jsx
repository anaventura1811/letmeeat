import React from 'react';
import PropTypes from 'prop-types';

function RecipeInstructions({ recipe }) {
  return (
    <div>
      <h3>Instructions</h3>
      <div className="instructions">
        <p data-testid="instructions">
          { recipe.strInstructions }
        </p>
      </div>
    </div>
  );
}

export default RecipeInstructions;

RecipeInstructions.propTypes = {
  recipe: PropTypes.shape().isRequired,
};
