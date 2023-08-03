// import { IUser } from '@/types';
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
};

export const registerUser = (
  user: RegisterUserCredentials,
  role = 'FOUNDER'
): Promise<{
  data: {
    email: string;
    role: string;
    token: string;
    firstName: string;
    lastName: string;
  };
}> => api.post(`${resource}/register?role=${role}`, user);

export const loginUser = (
  userCredentials: UserCredentials
): Promise<{
  data: {
    email: string;
    role: string;
    token: string;
    firstName: string;
    lastName: string;
  };
}> => api.post(`${resource}/login`, userCredentials);

export const validateUserToken = (): Promise<{
  data: { email: string; role: string; token: string };
}> => api.get(`${resource}/validate-token`);
