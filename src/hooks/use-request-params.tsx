import { useEffect, useMemo, useRef, useState } from 'react';
import { getSearchQuery, saveSearchQuery } from '../services/storage.tsx';
import { useRouter } from 'next/router';
import { getParams } from '../utils/params.tsx';
import { QueryParams } from '../types/api.tsx';
import { DEFAULT_DETAILS, DEFAULT_PAGE } from '../common/constant.tsx';

export interface RequestParamsHook {
  params: QueryParams;
  setParams: (params: QueryParams) => void;
}
export const useRequestParams = (): RequestParamsHook => {
  const router = useRouter();
  const queryRef = useRef(getSearchQuery(''));
  const initialParams = useMemo(() => {
    if (router.isReady) {
      return getParams(router, queryRef.current);
    }
    return {
      query: queryRef.current,
      page: DEFAULT_PAGE,
      details: DEFAULT_DETAILS,
    };
  }, [router.isReady]);
  const [params, setParams] = useState<QueryParams>(initialParams);
  const prevParamsRef = useRef<QueryParams>(initialParams);
  const memoizedParams = useMemo(() => {
    if (JSON.stringify(prevParamsRef.current) !== JSON.stringify(params)) {
      prevParamsRef.current = params;
    }
    return prevParamsRef.current;
  }, [params]);

  useEffect(() => {
    router.push({
      pathname: router.pathname,
      query: {
        ...(memoizedParams.page && { page: memoizedParams.page }),
        ...(memoizedParams.query && { query: memoizedParams.query }),
        ...(memoizedParams.details && { details: memoizedParams.details }),
      },
    });

    queryRef.current = memoizedParams.query;
    saveSearchQuery(queryRef.current);
    return (): void => {
      saveSearchQuery(queryRef.current);
    };
  }, [memoizedParams]);

  return { params, setParams };
};
