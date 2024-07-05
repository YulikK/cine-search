import { GUID_STORE } from '../common/constant';

export const saveSearchQuery = (query: string) => {
  const search = query.trim();
  if (search) {
    localStorage.setItem(GUID_STORE, query);
  } else {
    localStorage.removeItem(GUID_STORE);
  }
};

export const getSearchQuery = (): string => {
  return localStorage.getItem(GUID_STORE) || '';
};
