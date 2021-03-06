import useRecipes from "../hooks/UseRecipes";
import format from 'date-fns/format';
import ptBR from 'date-fns/locale/pt-BR';

export default function useReset() {

  const { setInputSearch, setRadioValue, setSearchBarFilters, setFilteredRecipes } = useRecipes();

  const handleResetFilters = () => {
    setInputSearch('');
		setRadioValue('');
		setSearchBarFilters([]);
    setFilteredRecipes([]);
  }

  return [handleResetFilters];
};

export const formattingMeasuresAndIngredients = (keysAndValues) => {
	const mapingValues = keysAndValues.reduce(
		(acc, cur) => {
			const objeto = acc;
			const [key, value] = cur;

			if (key.includes('strIngredient') && value) {
				objeto.ingredients.push(value);
			}
			if (key.includes('strMeasure') && value) {
				objeto.measures.push(value);
			}
			// console.log(objeto);
			return objeto;
		},
		{
			ingredients: [],
			measures: [],
		}
	);
	return mapingValues;
};

export const getCopyToClipboard = (type, id) => {
	let url = '';
	if (type === 'meals') {
		url = 'http://localhost:3000/meals/';
	}
	if (type === 'drinks') {
		url = 'http://localhost:3000/drinks/';
	}
	navigator.clipboard.writeText(`${url}${id}`);
};

export const currentDate = format(new Date(), 'd MMM yyyy', {
  locale: ptBR,
});

// Source - lib de datas: https://date-fns.org/v1.28.5/docs/format
