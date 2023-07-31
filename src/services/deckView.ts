import { api } from '../adapters/api';
import { IDeckView } from '../types';

const resource = 'deck-view';

export const getDeckViewByDeckId = (
  id: string
): Promise<{
  data: IDeckView[];
}> => api.get(`${resource}/${id}`).then((data) => data);
