import React, { useState } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import SearchBar from '../components/SearchBar/SearchBar';
import { ImSearch } from 'react-icons/im';

function Home({ type }) {
  const [isActive, setIsActive] = useState(false);
  const handleToggleSearchBar = () => {
		setIsActive((prevState) => !prevState);
	};

  return (
		<div>
			<Header>
        <button type="button" onClick={ handleToggleSearchBar }>
          <ImSearch size={ 30 } />
        </button>
      </Header>
      { isActive ? <SearchBar type={ type } /> : '' }

			<h1>Página principal</h1>

			<Footer />
		</div>
	);
}

export default Home;
