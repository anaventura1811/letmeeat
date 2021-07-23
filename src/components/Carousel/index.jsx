import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useRecipes from '../../hooks/UseRecipes';
import { CarouselProvider, Slider } from 'pure-react-carousel';
import CarouselCardGrid from '../CarouselCardGrid';
import CarouselWrapper from './styles';

function Carousel({ recipeRecommendations, type }) {
  const currentRecommendation = type === 'meals' ? 'drinks' : 'meals';
  const recipes = recipeRecommendations;
  const { setIsRecommended } = useRecipes();

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    setIsRecommended(true);
    return () => {
      cancel = true;
    };
  }, [setIsRecommended]);

  return (
    <CarouselWrapper>
      <CarouselProvider>
        <div className="card-grid">
          <Slider>
            <CarouselCardGrid recipes={ recipes } type={ currentRecommendation } />
          </Slider>
        </div>
      </CarouselProvider>
    </CarouselWrapper>
  )
}

export default Carousel;

Carousel.propTypes = {
	recipeRecommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
	type: PropTypes.string.isRequired,
};

// Source - documentação da bilioteca de carousel: https://github.com/express-labs/pure-react-carousel#image-
// https://express-labs.github.io/pure-react-carousel/
