import { Switch, Route } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Explore from './pages/Explore';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreOrigin from './pages/ExploreOrigin';
import ExploreType from './pages/ExploreType';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function App() {
  return (
		<Switch>
			<Route path='/' exact component={Login} />
			<Route exact path='/meals' render={(props) => <Home {...props} type='meals' />} />
			<Route exact path='/drinks' render={(props) => <Home {...props} type='drinks' />} />
			<Route path='/user' component={Profile} />
			<Route path='/explore' exact component={Explore} />
			<Route path='/explore/meals/area' component={ExploreOrigin} />
			<Route
				exact
				path='/explore/meals/ingredients'
				render={(props) => <ExploreIngredients {...props} type='meals' />}
			/>
			<Route
				exact
				path='/explorar/drinks/ingredients'
				render={(props) => <ExploreIngredients {...props} type='drinks' />}
			/>
			<Route
				exact
				path='/explore/meals'
				render={(props) => <ExploreType {...props} type='meals' />}
			/>
			<Route
				exact
				path='/explore/drinks'
				render={(props) => <ExploreType {...props} type='drinks' />}
			/>
			<Route path='/explore/meals/area' exact component={ExploreOrigin} />
			<Route path='/explore/drinks/area' render={() => <h1>Not Found</h1>} />
			<Route
				exact
				path='/meals/:id'
				render={(props) => <RecipeDetails {...props} type='meals' />}
			/>
			<Route
				exact
				path='/drinks/:id'
				render={(props) => <RecipeDetails {...props} type='drinks' />}
			/>
			<Route path='/favorite-recipes' component={FavoriteRecipes} />
			<Route path='/done-recipes' component={DoneRecipes} />
			<Route
				exact
				path='/meals/:id/in-progress'
				render={(props) => <RecipeInProgress {...props} type='meals' />}
			/>
			<Route
				exact
				path='/drinks/:id/in-progress'
				render={(props) => <RecipeInProgress {...props} type='drinks' />}
			/>
		</Switch>
	);
}

export default App;
