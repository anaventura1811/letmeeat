import React, { useState, useEffect }from 'react';
import { useHistory } from 'react-router-dom';

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
    <div>
      <div className='page-grid'>
        <aside className='img-wrapper'></aside>
        <div />
        <div />
        <div className='separator' />
        <div>
          <input
            type='text'
            data-testid='email-input'
            id='email'
            placeholder="email"
            onChange={ (ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            data-testid="password-input"
            id="password"
            onChange={ (ev) => setPassword(ev.target.value)}
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            onClick={ handleClick }
          >
            Login
          </button>
        </div>
      </div>
    </div>
	);
}

export default Login;
