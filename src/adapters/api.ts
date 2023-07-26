/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
});

const basePath = 'http://localhost:3000/api';

const api = {
  get: (endpoint: string) => axiosApi.get(`/${endpoint}`),
  post: (endpoint: string, body) => axiosApi.post(`/${endpoint}`, body),
  put: (endpoint: string, body) =>
    axiosApi.put(`${basePath}/${endpoint}`, body),
  delete: (endpoint: string) => axiosApi.delete(`${basePath}/${endpoint}`),
};

export { api };
