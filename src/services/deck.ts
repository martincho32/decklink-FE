import { AxiosRequestConfig } from 'axios';
import { api } from '../adapters/api';

const resource = 'deck';

export const getDecksByUserId = () => api.get(resource).then((data) => data);

export const createDeck = (
  deck,
  config: AxiosRequestConfig<any> | undefined = undefined
) => {
  return api.post(resource, deck, config);
};

export const getDeckByCustomLink = (customLink: string) =>
  api.get(`${resource}/custom/${customLink}`);

// export const deleteItem = (itemId) => api.delete(`${resource}/${itemId}`);
