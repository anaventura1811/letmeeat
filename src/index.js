import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserContextProvider from './contexts/UserContext';
import RecipesContextProvider from './contexts/RecipesContext';
import 'react-toastify/dist/ReactToastify.css';



ReactDOM.render(
	<BrowserRouter>
		<React.StrictMode>
			<UserContextProvider>
				<RecipesContextProvider>
					<App />
				</RecipesContextProvider>
			</UserContextProvider>
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
serviceWorker.unregister();
