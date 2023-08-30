// import { IUser } from '@/types';
import { AxiosRequestConfig } from 'axios';
import { api } from '../adapters/api';

const resource = 'auth';

type UserCredentials = {
  email: string;
  password: string;
};

type RegisterUserCredentials = UserCredentials & {
  cfpassword: string;
  firstName: string;
  lastName: string;
  allowEmails: boolean;
  companyName: string;
  companyWebUrl: string;
};

export const registerUser = (
  user: RegisterUserCredentials,
  referredBy: string,
  role = 'FOUNDER'
): Promise<{
  data: {
    email: string;
    role: string;
    token: string;
    firstName: string;
    lastName: string;
    allowEmails: boolean;
    hasCreatedDeck: boolean;
  };
}> =>
  api.post(`${resource}/register?role=${role}&referredBy=${referredBy}`, user);

export const loginUser = (
  userCredentials: UserCredentials
): Promise<{
  data: {
    email: string;
    role: string;
    token: string;
    firstName: string;
    lastName: string;
    hasCreatedDeck: boolean;
  };
}> => api.post(`${resource}/login`, userCredentials);

export const validateUserToken = (
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: {
    email: string;
    role: string;
    token: string;
    hasCreatedDeck: boolean;
    firstName: string;
    id: string;
    maxDecksStorageSize: number;
  };
}> => api.get(`${resource}/validate-token`, config);

export const forgotPassword = (
  email: string
): Promise<{
  data: {
    status: string;
    message: string;
  };
}> => api.post(`${resource}/forgotPassword`, { email });

export const resetPassword = (
  token: string,
  password: string,
  cfpassword: string
): Promise<{
  data: {
    status: string;
    message: string;
    email: string;
  };
}> => api.patch(`${resource}/resetPassword/${token}`, { password, cfpassword });
