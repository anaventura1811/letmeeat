import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

import drinkImg from '../../images/drinkIcon.svg';
import foodImg from '../../images/mealIcon.svg';
import exploreImg from '../../images/exploreIcon.svg';
import useReset from '../../helpers/helperFunctions';


function Footer() {

  const [handleResetFilters] = useReset();

  return (
		<Container data-testid='footer'>
			<Content>
				<li>
					<Link to='/drinks'>
						<input
              type="image"
              src={drinkImg}
              data-testid='drinks-bottom-btn'
              alt='drinks icon'
              onClick={ handleResetFilters }
            />
					</Link>
				</li>
				<li>
					<Link to='/explore'>
						<input
              type="image"
              src={exploreImg}
              alt='explore icon'
              data-testid='explore-bottom-btn'
            />
					</Link>
				</li>
        <li>
          <Link to="/meals">
            <input
              type="image"
              src={foodImg}
              alt="food icon"
              data-testid="food-bottom-btn"
              onClick={ handleResetFilters }
            />
          </Link>
        </li>
			</Content>
		</Container>
	);
}

export default Footer;
