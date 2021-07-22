import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import useRecipes from '../../hooks/UseRecipes';
import SearchBarContainer from './styles';

function SearchBar({ type }) {
  const [inputSearch, setInputSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { searchBarFilters, setSearchBarFilters } = useRecipes();

   // configura o onChange dos radio inputs
  const handleChange = useCallback((event) => {
    setRadioValue(event.target.value);
  }, []);

    // submit do botão de busca, coloca os filtros num array que servirá de trigger para o fetch no contexto
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
    // console.log(inputSearch, radioValue);
    setSearchBarFilters(
      searchBarFilters.concat({
        radioValue,
        inputSearch,
      }),
    );
    // console.log(searchBarFilters);
  }, [inputSearch, radioValue, searchBarFilters, setSearchBarFilters]);

  return (
    <SearchBarContainer>
      <input
        type="text"
        placeholder="search recipe"
        data-testid="search-input"
        value={ inputSearch }
        onChange={ (ev) => setInputSearch(ev.target.value) }
      />
      <form className="form-control" onSubmit={ (ev) => handleSubmit(ev) }>
        <label htmlFor="ingredient">
          <input
            type="radio"
            checked={ radioValue === 'ingredient' }
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ (ev) => handleChange(ev) }
          />
          ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            checked={ radioValue === 'name' }
            id="name"
            value="name"
            data-testid="name-search-radio"
            onChange={ (ev) => handleChange(ev) }
          />
          name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            checked={ radioValue === 'first-letter' }
            id="first-letter"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ (ev) => handleChange(ev) }
          />
          first letter
        </label>
      </form>
      <div className="btn-container">
        <button
          type="submit"
          data-testid="exec-search-btn"
          onClick={(ev) => handleSubmit(ev) }
        >
          search
        </button>
      </div>
    </SearchBarContainer>
  )
}

export default SearchBar;

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};
