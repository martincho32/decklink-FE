import { AxiosRequestConfig } from 'axios';
import { api } from '../adapters/api';

const resource = 'deck';

export const getDecksByUserId = () => api.get(resource).then((data) => data);

export const getDeckById = (
  id: string
): Promise<{
  data: {
    customDeckLink: string;
    deckUrl: string;
    name: string;
    password: string;
    requestEmail: boolean;
    requestPassword: boolean;
    slides: number;
  };
}> => api.get(`${resource}/${id}`).then((data) => data);

export const createDeck = (
  deck,
  config: AxiosRequestConfig<any> | undefined = undefined
) => {
  return api.post(resource, deck, config);
};

export const editDeck = (
  deck,
  id,
  config: AxiosRequestConfig<any> | undefined = undefined
) => {
  return api.patch(`${resource}/${id}`, deck, config);
};

export const getDeckByCustomLink = (customLink: string) =>
  api.get(`${resource}/custom/${customLink}`);

export const deleteDeck = (deckId) => api.delete(`${resource}/${deckId}`);
