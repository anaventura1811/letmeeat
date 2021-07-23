import React from 'react';
import useRecipes from '../../hooks/UseRecipes';
import CardContainer, { RecommendationCardsContainer } from './styles';
// import StarRating from '../StarRating';

function Card({ index, recipe }) {
  const recipeCategory = recipe.strAlcoholic || recipe.strCategory;
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
  const { isRecommended } = useRecipes();

  if (isRecommended) {
    return (
      <RecommendationCardsContainer>
        {
          <div
            data-testid={ `${index}-recommendation-card` }
          >
            <div className="img-wrapper">
              <img
                data-testid={ `${index}-card-img`}
                src={ recipeThumb }
                alt="Delicious food/drink"
              />
            </div>
            <div className="card-info">
              <span
                data-testid={ `${index}-recommendation-title` }
                className="card-info-paragraph"
              >
                { recipeName }
                {/* <span>
                  <img
                    src={ ''}
                    alt="logo letmeEat"
                  />
                </span> */}
              </span>
              <br />
              <div className="recipe-category">
                <p>{ recipeCategory }</p>
              </div>
            </div>
          </div>
        }
      </RecommendationCardsContainer>
    );
  }
  
  return (
		<CardContainer>
			<div data-testid={`${index}-recipe-card`}>
				<div className='img-wrapper'>
					<img data-testid={`${index}-card-img`} src={recipeThumb} alt='Delicious food/drink' />
				</div>
				<div className='card-info'>
					<div className='recipe-name'>
						<p data-testid={`${index}-card-name`}>{recipeName}</p>
					</div>
					<div />
					<div className='category'>
						<p>{recipeCategory}</p>
					</div>
					<div className='rating'>
					</div>
				</div>
			</div>
		</CardContainer>
	);
}

export default Card;
