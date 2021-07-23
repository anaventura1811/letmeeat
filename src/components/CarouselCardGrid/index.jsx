import React from 'react';
import { Link } from 'react-router-dom';
import { Slide } from 'pure-react-carousel';
import PropTypes from 'prop-types';
import Card from '../Card/Card';
import { CarouselCardContainer } from '../Carousel/styles';


function CarouselCardGrid({ recipes, type }) {
  if (recipes.length === 0) {
    return 'Loading...';
  }

  return (
    <CarouselCardContainer>
      { recipes.length > 0 && recipes.map((recipe, i) => (
  
          <Slide index={ i } className="slide-size" key={ i}>
            <Link
              to={{ pathname: type === 'meals' ? `/meals/${recipe.idMeal}` : `/drinks/${recipe.idDrink}`}}
              key={ i }
            >
              <Card recipe={ recipe } index={ i } />
            </Link>
          </Slide>
      ))}
    </CarouselCardContainer>
  )
}

export default CarouselCardGrid;

CarouselCardGrid.propTypes = {
	recipes: PropTypes.shape(PropTypes.arrayOf(PropTypes.object)),
	type: PropTypes.string,
}.isRequired;
