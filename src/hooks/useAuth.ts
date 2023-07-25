/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useUser } from './useUser';
import { useLocalStorage } from './useLocalStorage';
import { loginService } from '../services';

export const useAuth = () => {
  const { user, addUser, removeUser } = useUser();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    const localStorageUser = getItem('user');
    if (localStorageUser) {
      addUser(JSON.parse(localStorageUser as string));
    }
  }, []);

  const login = async ({
    email,
    password,
  }): Promise<boolean | { response: { status: number } }> => {
    try {
      const { data } = await loginService.loginUser({ email, password });
      addUser({ email: data.email, authToken: data.token, role: data.role });
      return true;
    } catch (error: any) {
      console.error('useAuth login Error: ', error);
      return error;
    }
  };

  const signup = async ({
    email,
    password,
    cfpassword,
  }): Promise<boolean | { response: { status: number } }> => {
    try {
      await loginService.registerUser({
        email,
        password,
        cfpassword,
      });
      return true;
    } catch (error: any) {
      console.error('useAuth signup Error: ', error);
      return error;
    }
  };

  const logout = () => {
    removeUser();
  };

  return { user, login, signup, logout };
};
