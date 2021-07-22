import { useContext } from 'react';
import { RecipesContext } from '../contexts/RecipesContext';

export default function useRecipes() {
	const value = useContext(RecipesContext);
	return value;
}
