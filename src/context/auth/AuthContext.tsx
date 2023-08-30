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
    allowEmails: boolean,
    companyName: string,
    companyWebUrl: string,
    referredBy: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  resetPassword: (password: string, token: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  validateToken: () => Promise<boolean>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
