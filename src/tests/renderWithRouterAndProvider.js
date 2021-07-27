import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import UserContextProvider from '../contexts/UserContext';
import RecipesContextProvider from '../contexts/RecipesContext';


const renderWithRouterAndProvider = async (component, route = '/') => {
	const history = createMemoryHistory();
	history.push(route);

	return {
		...render(
			<Router history={history}>
        <UserContextProvider>
					<RecipesContextProvider>
				  	{component}
					</RecipesContextProvider>
        </UserContextProvider>
			</Router>
		),
		history,
	};
};

export default renderWithRouterAndProvider;
