import axios, { AxiosRequestConfig } from 'axios';

function setBasePath(): string {
  if (import.meta.url.includes('local')) {
    return 'http://localhost:3000/api';
  }
  if (import.meta.url.includes('integration')) {
    return 'https://development-dot-algebraic-hub-392717.uc.r.appspot.com/api';
  }
  if (import.meta.url.includes('fundraisingtoolbox')) {
    return 'https://algebraic-hub-392717.uc.r.appspot.com/api';
  }
  console.log('Url does not includes any of the roveded parameters');
  return '';
}

const basePath = setBasePath();

console.log('basePath: ', basePath);
console.log(import.meta.url.includes('integration'));

const axiosApi = axios.create({
  // baseURL: 'https://algebraic-hub-392717.uc.r.appspot.com/api',
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

// const basePath = 'https://algebraic-hub-392717.uc.r.appspot.com/api';

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
