import { api } from '../adapters/api';

const resource = 'auth';

type UserCredentials = {
  email: string;
  password: string;
};

type RegisterUserCredentials = UserCredentials & {
  cfpassword: string;
};

export const registerUser = (user: RegisterUserCredentials, role = 'FOUNDER') =>
  api.post(`${resource}/register?role=${role}`, user);

export const loginUser = (
  userCredentials: UserCredentials
): Promise<{
  data: { email: string; role: string; token: string };
}> => api.post(`${resource}/login`, userCredentials);
