/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';

const basePath = 'http://localhost:3000/api';

const api = {
  get: (endpoint: string) => axios.get(`${endpoint}`),
  post: (endpoint: string, body) => axios.post(`${basePath}/${endpoint}`, body),
  put: (endpoint: string, body) => axios.put(`${basePath}/${endpoint}`, body),
  delete: (endpoint: string) => axios.delete(`${basePath}/${endpoint}`),
};

export { api };
