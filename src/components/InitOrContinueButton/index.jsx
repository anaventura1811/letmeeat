import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useParams } from 'react-router-dom';
import { handleCheckDoneRecipes, handleCheckLS } from '../../helpers/localStorageService';

function InitOrContinueButton({ type }) {
  const [isRecipeInProgress, setRecipeInProgress] = useState(false);
  const [hasRecipeBeenDone, setDoneRecipe] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    const checkId = handleCheckLS('inProgressRecipes', id, type);
    if (checkId) return setRecipeInProgress(true);
    const checkDoneRecipe = handleCheckDoneRecipes('doneRecipes', id);
    if (checkDoneRecipe) return setDoneRecipe(true);

    return () => {
      cancel = true;
    }
  }, [id, type]);

  const handleClick = (ev) => {
    ev.preventDefault();
    history.push(`${id}/in-progress`);
  };

  if (hasRecipeBeenDone) {
    return '';
  }

  return (
    <button
      type="submit"
      className="recipe-btn"
      onClick={ (ev) => handleClick(ev) }
    >
      { isRecipeInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
}

export default InitOrContinueButton;

InitOrContinueButton.propTypes = {
  type: PropTypes.string.isRequired,
};
