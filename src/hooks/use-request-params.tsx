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
  const queryRef = useRef(getSearchQuery(''));

  useEffect(() => {
    const urlQuery = searchParams.get('query');
    const currentQuery = urlQuery === null ? queryRef.current : urlQuery;

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

    queryRef.current = currentQuery;

    return (): void => {
      saveSearchQuery(queryRef.current);
    };
  }, [searchParams, setSearchParams]);

  return {
    searchParams,
    setSearchParams,
  };
};
