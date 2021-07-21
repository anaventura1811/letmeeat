import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';
import { LoginContainer, Container } from '../styles/login';

function Login() {
  const history = useHistory();
	const [emailData, setEmail] = useState('');
	const [passwordData, setPassword] = useState('');
	const [isButtonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
		let cancel = false;
		if (cancel) return;
		const subscription = () => {
			const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			const lengthSix = 6;
			if (re.test(emailData) && passwordData.trim().length > lengthSix) {
				setButtonDisabled(false);
			} else {
				setButtonDisabled(true);
			}
		};
		subscription();
		return () => {
			cancel = true;
		};
	}, [emailData, passwordData]);

  const handleClick = () => {
		const user = { email: emailData };
		localStorage.setItem('mealsToken', 1);
		localStorage.setItem('cocktailsToken', 1);
		localStorage.setItem('user', JSON.stringify(user));
		history.push('/comidas');
	};

  return (
    <LoginContainer>
      <div className='page-grid'>
        <aside className='img-wrapper'></aside>
        <div />
        <div />
        <div className='separator' />
        <Container>
          <label htmlFor="email">
            Email
            <input
              type='text'
              data-testid='email-input'
              id='email'
              onChange={ (ev) => setEmail(ev.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              data-testid="password-input"
              id="password"
              onChange={ (ev) => setPassword(ev.target.value)}
            />
          </label>
          <button
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleClick }
            disabled={ isButtonDisabled }
          >
            Login
          </button>
        </Container>
      </div>
    </LoginContainer>
	);
}

export default Login;
