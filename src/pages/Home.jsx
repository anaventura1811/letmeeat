import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import { ImSearch } from 'react-icons/im';
import CardList from '../components/CardList';
import useFetchRecipes from '../hooks/UseFetchRecipes';
import useRecipes from '../hooks/UseRecipes';
import CategoriesList from '../components/CategoriesList';
import Container from '../styles/home';

const MEALS_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const DRINKS_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Home({ type }) {
  const [isActive, setIsActive] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const { fetchRecipesContext} = useRecipes();


  const [, setFetchUrl] = useFetchRecipes(type);

  const handleToggleSearchBar = () => {
		setIsActive((prevState) => !prevState);
	};

  useEffect(() => {
		if (type === 'meals') {
			return setFetchUrl(MEALS_URL);
		}
		if (type === 'drinks') {
			return setFetchUrl(DRINKS_URL);
		}
	}, [setFetchUrl, type]);

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    if (fetchRecipesContext[type]) setRecipes(fetchRecipesContext[type]);

    return() => {
      cancel = true;
    };

  }, [fetchRecipesContext, type]);

  return (
		<Container>
			<Header>
				<button type='button' onClick={handleToggleSearchBar}>
					<ImSearch size={30} />
				</button>
			</Header>
			{isActive ? (<SearchBar type={type} />) : (<CategoriesList type={type} />)}
			<CardList recipes={recipes} type={type} />
			<Footer />
		</Container>
	);
}

export default Home;
