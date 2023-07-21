import { api } from '../adapters/api';

const resource = 'auth';

export const registerUser = (user, role = 'USER') =>
  api.post(`${resource}/register?role=${role}`, user);

export const loginUser = (user) => api.post(`${resource}/login`, user);
