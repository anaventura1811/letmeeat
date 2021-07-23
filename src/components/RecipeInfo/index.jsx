import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { FiShare2 } from 'react-icons/fi';
import handleSetFavoritesToLocalStorage from '../../helpers/localStorageService';

import { getCopyToClipboard } from '../../helpers/helperFunctions';

const THREE_SECONDS = 3000;

function RecipeInfo(props) {
    const { recipeThumb, recipeName, type, recipe, recipeCategory } = props;
		const { id } = useParams();
    const [copyToClipboard, setCopyToClipboard] = useState(false);
		const [isFavorite, setIsFavorite] = useState(false);
		const recipeId = type === 'meals' ? recipe.idMeal : recipe.idDrink;
		const recipeType = type === 'meals' ? 'meals' : 'drinks';


  const recipesObject = {
		id: recipeId,
		type: recipeType,
		area: recipe.strArea || '',
		category: recipe.strCategory || '',
		name: recipeName,
		image: recipeThumb,
		alcoholicOrNot: recipe.strAlcoholic || '',
	};

  useEffect(() => {
		let cancel = false;
		const handleCreateLocalStorageFavKey = () => {
			if (cancel) return;
			const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
			if (getFavoriteRecipes && getFavoriteRecipes.some((item) => item.id === id)) {
				setIsFavorite(true);
			} else if (!getFavoriteRecipes) {
				setIsFavorite(false);
				localStorage.setItem('favoriteRecipes', JSON.stringify([]));
			}
		};
		handleCreateLocalStorageFavKey();
		return () => {
			cancel = true;
		};
	}, [id]);
  
  const handleCopyToClipboard = () => {
		getCopyToClipboard(type, id);
		setCopyToClipboard(true);
		setTimeout(() => {
			setCopyToClipboard(false);
		}, THREE_SECONDS);
 };

  const handleAddFavoriteRecipe = () => {
		setIsFavorite((prevState) => !prevState);
	};

  useEffect(() => {
		handleSetFavoritesToLocalStorage(recipesObject, isFavorite, 'favoriteRecipes', id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isFavorite]);

	return (
		<div className='componente1'>
			<div className='recipe-info'>
				<h2 data-testid='recipe-title' className='recipe-title'>
					{recipeName}
				</h2>
			</div>
			<div className='img-container'>
				<img src={recipeThumb} alt='Foto da receita' data-testid='recipe-photo' />
			</div>
			<div className='container'>
				<div>
					<h3 data-testid='recipe-category'>{recipeCategory}</h3>
				</div>
				<div className='icons'>
					{copyToClipboard ? <span>Copied!</span> : ''}
					<FiShare2
						size={30}
						color={copyToClipboard ? 'green' : ''}
						onClick={handleCopyToClipboard}
						data-testid='share-btn'
					/>
					<FaHeart
						size={30}
						color={isFavorite ? 'red' : '#e4e5e9'}
						onClick={handleAddFavoriteRecipe}
					/>
				</div>
			</div>
		</div>
	);
}

export default RecipeInfo;

RecipeInfo.defaultProps = {
	recipe: {},
	recipeName: '',
	recipeThumb: '',
};

RecipeInfo.propTypes = {
	recipeThumb: PropTypes.string,
	recipeName: PropTypes.string,
	recipeCategory: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	recipe: PropTypes.shape(),
};

// Lógica de copiar para o clipboard pesquisada no StackOverflow
// Link: https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
// https://dev.to/myogeshchavan97/an-easy-way-for-adding-copy-to-clipboard-functionality-in-react-app-4oo0
