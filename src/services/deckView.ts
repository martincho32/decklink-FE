import { AxiosRequestConfig } from 'axios';
import { api } from '../adapters/api';
import { IDeckView } from '../types';

const resource = 'deck-view';

export const getDeckViewByDeckId = (
  id: string,
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: IDeckView[];
}> => api.get(`${resource}/${id}`, config).then((data) => data);

export const getDeckViewByDeckUrl = (
  url: string,
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: IDeckView[];
}> => api.get(`${resource}/url/${url}`, config).then((data) => data);

export const getDeckViewByDeckCustomLink = (
  url: string,
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: IDeckView[];
}> => api.get(`${resource}/url/${url}`, config).then((data) => data);

export const getDeckViewByNotStale = (
  stale: boolean,
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: IDeckView[];
}> => api.get(`${resource}/url/${stale}`, config).then((data) => data);

export const createDeckView = (
  deckView: Partial<IDeckView>,
  config: AxiosRequestConfig<any> | undefined = undefined
): Promise<{
  data: IDeckView;
}> => {
  return api.post(resource, deckView, config);
};

export const editDeckView = (
  deckView: Partial<IDeckView>,
  id,
  config: AxiosRequestConfig<any> | undefined = undefined
) => {
  return api.patch(`${resource}/${id}`, deckView, config);
};
