import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useLocalStorage } from './useLocalStorage';

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setItem, removeItem } = useLocalStorage();

  const addUser = ({ email, authToken, role }) => {
    setUser({ email, authToken, role });
    setItem('user', JSON.stringify({ email, authToken, role }));
  };

  const removeUser = () => {
    setUser({});
    removeItem('user');
  };

  return { user, addUser, removeUser };
};
