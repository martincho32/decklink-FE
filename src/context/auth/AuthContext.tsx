import { createContext } from 'react';
import { IUser } from '../../types';

interface ContextProps {
  isLoggedIn: boolean;
  user?: Partial<IUser>;

  loginUser: (
    _email: string,
    password: string
  ) => Promise<{
    noError: boolean;
    message?: string;
  }>;
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
  resetPassword: (
    token: string,
    password: string,
    repeatPassword: string
  ) => Promise<{
    hasError: boolean;
    message?: string;
    email?: string;
  }>;
  forgotPassword: (email: string) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  sendEmailVerification: (email: string) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  verifyEmail: (token: string) => Promise<{
    hasError: boolean;
    message?: string;
  }>;
  validateToken: () => Promise<boolean>;
  logoutUser: () => void;
}

export const AuthContext = createContext({} as ContextProps);
