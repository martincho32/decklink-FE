import { api } from '../adapters/api';

const resource = 'deck';

export const getDecksByUserId = () => api.get(resource).then((data) => data);

export const createDeck = (deck) => api.post(resource, deck);

export const getDeckByCustomLink = (customLink: string) =>
  api.get(`${resource}/custom/${customLink}`);

// export const deleteItem = (itemId) => api.delete(`${resource}/${itemId}`);
