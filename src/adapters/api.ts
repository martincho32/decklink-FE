import axios, { AxiosRequestConfig } from 'axios';

function setBasePath(): string {
  if (typeof window !== 'undefined') {
    if (window.location.href.includes('local')) {
      return 'http://localhost:3001/api';
    }
    if (window.location.href.includes('integration')) {
      return 'https://development-dot-algebraic-hub-392717.uc.r.appspot.com/api';
    }
    if (window.location.href.includes('fundraisingtoolbox')) {
      return 'https://algebraic-hub-392717.uc.r.appspot.com/api';
    }
  }
  console.log('Url does not includes any of the provided parameters');
  return 'http://localhost:3001/api';
}

const basePath = setBasePath();

const axiosApi = axios.create({
  baseURL: basePath,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://decklink-fe.vercel.app',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key',
    'Access-Control-Allow-Methods': 'GET, HEAD, POST, PUT, DELETE, OPTIONS',
  },
});

const api = {
  get: (
    endpoint: string,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => axiosApi.get(`/${endpoint}`, config),
  post: (
    endpoint: string,
    body,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => axiosApi.post(`/${endpoint}`, body, config),
  put: (
    endpoint: string,
    body,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => axiosApi.put(`/${endpoint}`, body, config),
  patch: (
    endpoint: string,
    body,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => axiosApi.patch(`/${endpoint}`, body, config),
  delete: (
    endpoint: string,
    config: AxiosRequestConfig<any> | undefined = undefined
  ) => axiosApi.delete(`/${endpoint}`, config),
};

export { api };
