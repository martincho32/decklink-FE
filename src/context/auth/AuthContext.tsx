import { createContext } from 'react';
import { IUser } from '../../types';

interface ContextProps {
  isLoggedIn: boolean;
  user?: Partial<IUser>;

  loginUser: (_email: string, password: string) => Promise<boolean>;
  registerUser: (
    _email: string,
    password: string,
    cfpassword: string,
    firstName: string,
    lastName: string,
    companyName: string,
    companyWebUrl: string,
    referredBy: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  validateToken: () => Promise<boolean>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
