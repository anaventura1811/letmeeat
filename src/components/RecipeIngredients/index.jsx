import React from 'react';
import PropTypes from 'prop-types';
import { formattingMeasuresAndIngredients } from '../../helpers/helperFunctions';

function RecipeIngredients({ recipe }) {
  const keysAndValues = Object.entries(recipe);
  const formatting = formattingMeasuresAndIngredients(keysAndValues);
  const { ingredients, measures } = formatting;

  return (
		<div>
			<h3>Ingredients</h3>
			<div className='ingredients-list'>
				<div className='ing'>
					<ul>
						{ingredients.map((element, index) => (
							<li key={index}>
								<span data-testid={`${index}-ingredient-name-and-measure`}>
                  {measures[index]}
                </span>
                  {' '}
								<span data-testid={`${index}-ingredient-name-and-measure`}>
                  {element}
                </span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default RecipeIngredients;
RecipeIngredients.propTypes = {
	recipe: PropTypes.shape().isRequired,
};