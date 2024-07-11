import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../common/constant.tsx';

interface RequestParamsHook {
  page: number;
  setPage: (page: number) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}
export const useRequestParams = (): RequestParamsHook => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState<number>(
    parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10)
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    searchParams.get('query') || ''
  );

  const isUpdatingFromUrl = useRef(false);
  const isUpdatingFromState = useRef(false);

  useEffect(() => {
    if (isUpdatingFromState.current) {
      isUpdatingFromState.current = false;
      return;
    }

    const newPage = parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10);

    const newQuery = searchParams.get('query') || '';

    if (newPage !== page) {
      isUpdatingFromUrl.current = true;
      setPage(newPage);
    }
    if (newQuery !== searchQuery) {
      isUpdatingFromUrl.current = true;
      setSearchQuery(newQuery);
    }
  }, [searchParams, page, searchQuery]);

  useEffect(() => {
    if (isUpdatingFromUrl.current) {
      isUpdatingFromUrl.current = false;
      return;
    }

    isUpdatingFromState.current = true;
    setSearchParams({
      page: page.toString(),
      ...(searchQuery && { query: searchQuery }),
    });
  }, [page, searchQuery, setSearchParams]);

  return {
    page,
    setPage,
    searchQuery,
    setSearchQuery,
  };
};
