import React from 'react';

import { LoginContainer, Container } from '../styles/login';
import useLogin from '../hooks/UseLogin';

function Login() {
 const { setEmail, setPassword, isButtonDisabled, handleClick } = useLogin();

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
            disabled={ isButtonDisabled }
            onClick={ () => handleClick()}
          >
            Login
          </button>
        </Container>
      </div>
    </LoginContainer>
	);
}

export default Login;
