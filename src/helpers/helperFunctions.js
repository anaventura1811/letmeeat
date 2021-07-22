import useRecipes from "../hooks/UseRecipes";

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
