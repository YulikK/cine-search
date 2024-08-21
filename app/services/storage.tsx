import { GUID_STORE } from '../common/constant.js';

export const saveSearchQuery = (query: string): void => {
  const search = query.trim();
  if (search) {
    localStorage.setItem(GUID_STORE, query);
  } else {
    localStorage.removeItem(GUID_STORE);
  }
};

export const getSearchQuery = (initialQuery: string): string =>
  localStorage.getItem(GUID_STORE) || initialQuery;
