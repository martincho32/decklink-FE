import { AxiosRequestConfig } from 'axios';
import { api } from '../adapters/api';
import { IUpgrade } from '@/types';

const resource = 'upgrade';

export const getAllUpgrades = async (
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: IUpgrade[];
}> => api.get(`${resource}`, config);

export const redeemUpgradeItem = async (
  item: Partial<IUpgrade>,
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: { message: string };
}> => api.post(`${resource}/redeem`, item, config);
