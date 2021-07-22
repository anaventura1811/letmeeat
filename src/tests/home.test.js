import React from 'react';
// import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import App from '../App';

import renderWithRouterAndProvider from './renderWithRouterAndProvider';

const DRINKS_ICON_TESTID = 'drinks-bottom-btn';
const EXPLORE_ICON_TESTID = 'explore-bottom-btn';
const FOOD_ICON_TESTID = 'food-bottom-btn';

describe('Testes da página Home', () => {
  it('Testa se ícones do footer renderizam corretamente na Home Meals', async () => {
    renderWithRouterAndProvider(<App />, '/meals');
    await act(async () => {
      const drinkIcon = screen.getByTestId(DRINKS_ICON_TESTID);
      expect(drinkIcon).toBeInTheDocument();
    });

    await act(async () => {
      const exploreIcon = screen.getByTestId(EXPLORE_ICON_TESTID);
      expect(exploreIcon).toBeInTheDocument();
    });

    await act(async () => {
      const foodIcon = screen.getByTestId(FOOD_ICON_TESTID);
      expect(foodIcon).toBeInTheDocument();
    });
  }); 

  it('Testa se ícones do footer renderizam corretamente na Home Drinks', async () => {
    renderWithRouterAndProvider(<App />, '/drinks');
    await act(async () => {
			const drinkIcon = screen.getByTestId(DRINKS_ICON_TESTID);
			expect(drinkIcon).toBeInTheDocument();
		});

    await act(async () => {
			const exploreIcon = screen.getByTestId(EXPLORE_ICON_TESTID);
			expect(exploreIcon).toBeInTheDocument();
		});

    await act(async () => {
			const foodIcon = screen.getByTestId(FOOD_ICON_TESTID);
			expect(foodIcon).toBeInTheDocument();
		});
  });
});