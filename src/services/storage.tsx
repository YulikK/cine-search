import { GUID_STORE } from '../common/constant.tsx';

export const saveSearchQuery = (query: string): void => {
  const search = query.trim();
  if (search) {
    localStorage.setItem(GUID_STORE, query);
  } else {
    localStorage.removeItem(GUID_STORE);
  }
};

export const getSearchQuery = (): string =>
  localStorage.getItem(GUID_STORE) || '';
