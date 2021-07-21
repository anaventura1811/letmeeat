import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function useLogin() {
	const value = useContext(UserContext);
	return value;
}
