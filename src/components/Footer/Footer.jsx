import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

import drinkImg from '../../images/drinkIcon.svg';
import foodImg from '../../images/mealIcon.svg';
import exploreImg from '../../images/exploreIcon.svg';


function Footer() {
  return (
		<Container data-testid='footer'>
			<Content>
				<li>
					<Link to='/drinks'>
						<img src={drinkImg} data-testid='drinks-bottom-btn' alt='drinks icon' />
					</Link>
				</li>
				<li>
					<Link to='/explore'>
						<img src={exploreImg} alt='explore icon' data-testid='explore-bottom-btn' />
					</Link>
				</li>
        <li>
          <Link to="/meals">
            <img src={foodImg} alt="food icon" data-testid="food-bottom-btn" />
          </Link>
        </li>
			</Content>
		</Container>
	);
}

export default Footer;
