// import { IUser } from '@/types';
import { AxiosRequestConfig } from 'axios';
import { api } from '../adapters/api';
import { IUser } from '@/types';

const resource = 'user';

export const getUserDetail = async (
  id: string,
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: IUser;
}> => api.get(`${resource}/${id}`, config);
