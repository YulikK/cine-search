import { GUID_STORE } from '../common/constant';

export const saveSearchQuery = (query: string): void => {
  if (typeof window !== 'undefined') {
    const search = query.trim();
    if (search) {
      window.localStorage.setItem(GUID_STORE, query);
    } else {
      window.localStorage.removeItem(GUID_STORE);
    }
  }
};

export const getSearchQuery = (initialQuery: string): string => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(GUID_STORE) || initialQuery;
  }
  return initialQuery;
};
