import { useState, useEffect } from 'react';
import useRecipes from './UseRecipes';

const MAX_RECIPES = 18;

function useFetchRecipes(type) {
	const [fetchUrl, setFetchUrl] = useState('');
	const [recipesData, setRecipesData] = useState({});
	const { setFetchRecipesContext } = useRecipes();
	const fetchCategoriesUrl =
		type === 'meals'
			? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
			: 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

	useEffect(() => {
		let cancel = false;
		if (cancel) return;
		if (!fetchUrl) return;
		const fetchRecipes = async () => {
			try {
				const res = await fetch(fetchUrl);
				const data = await res.json();

				const limitedData = {
					...data,
					[type]: data[type].slice(0, MAX_RECIPES).reverse(),
				};

				setFetchRecipesContext(limitedData);
				setRecipesData(limitedData);
				console.log(limitedData);
			} catch (err) {
				console.log(err, fetchUrl);
			}
		};

		fetchRecipes();
		return () => {
			cancel = true;
		};
	}, [fetchUrl, type, setFetchRecipesContext, fetchCategoriesUrl]);

	return [recipesData, setFetchUrl];
}

export default useFetchRecipes;
