import { api } from '../adapters/api';

const resource = 'http://localhost:3000/ping';

export const testApi = () => api.get(resource);
