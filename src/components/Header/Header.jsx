import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import HeaderContainer from './styles';
import { FaUserCircle } from 'react-icons/fa';

function Header({ children }) {
  const history = useHistory();

  const handleRedirectToProfile = () => {
		history.push('/user');
	};
  
  return (
    <HeaderContainer>
      <div className="title-container">
        <Link to="/meals">
        </Link>
      </div>
      <div className="container">
        <button type="button" onClick={ handleRedirectToProfile }>
          <FaUserCircle size={ 30 } />
        </button>
        { children }
      </div>
    </HeaderContainer>
  )
}

export default Header;
