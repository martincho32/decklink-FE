/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios, { AxiosRequestConfig } from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://algebraic-hub-392717.uc.r.appspot.com/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':
      'https://vercel.com/martincho32/decklink-fe/G1fUNGy8ipsDXHPyAXpuFf5zah78',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
  },
});

const basePath = 'https://algebraic-hub-392717.uc.r.appspot.com/api';

const api = {
  get: (endpoint: string) => axiosApi.get(`/${endpoint}`),
  post: (
    endpoint: string,
    body,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => axiosApi.post(`/${endpoint}`, body, config),
  put: (
    endpoint: string,
    body,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => axiosApi.put(`${basePath}/${endpoint}`, body, config),
  patch: (
    endpoint: string,
    body,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => axiosApi.patch(`${basePath}/${endpoint}`, body, config),
  delete: (endpoint: string) => axiosApi.delete(`${basePath}/${endpoint}`),
};

export { api };
