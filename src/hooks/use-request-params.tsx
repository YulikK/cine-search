import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getSearchQuery, saveSearchQuery } from '../services/storage.tsx';
import { DEFAULT_PAGE } from '../common/constant.tsx';

interface RequestParamsHook {
  searchParams: URLSearchParams;
  setSearchParams: (params: Record<string, string>) => void;
}
export const useRequestParams = (): RequestParamsHook => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const saveQuery = getSearchQuery('');
    const currentQuery = isFirstRender.current
      ? searchParams.get('query') || saveQuery || ''
      : searchParams.get('query') || '';

    if (isFirstRender.current) {
      isFirstRender.current = false;
    }
    const currentPage = parseInt(
      searchParams.get('page') || `${DEFAULT_PAGE}`,
      10
    );

    if (!searchParams.get('query') || !searchParams.get('page')) {
      setSearchParams({
        page: currentPage.toString(),
        ...(currentQuery && { query: currentQuery }),
      });
    }

    return (): void => {
      const newQuery = searchParams.get('query') || '';
      saveSearchQuery(newQuery);
    };
  }, [searchParams, setSearchParams]);

  return {
    searchParams,
    setSearchParams,
  };
};
