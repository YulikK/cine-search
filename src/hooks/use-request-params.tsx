import { useEffect, useRef, useState } from 'react';
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
  const [params, setParams] = useState<QueryParams>({
    query: queryRef.current,
    page: DEFAULT_PAGE,
    details: DEFAULT_DETAILS,
  });
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current && router.isReady) {
      const initialParams = getParams(router, queryRef.current);
      setParams(initialParams);
      queryRef.current = initialParams.query;
      saveSearchQuery(queryRef.current);
      isFirstLoad.current = false;
    }
  }, [router]);

  useEffect(() => {
    if (
      (!params.page || !params.query || !params.details) &&
      !isFirstLoad.current
    ) {
      router.push({
        pathname: router.pathname,
        query: {
          ...(params.page && { page: params.page }),
          ...(params.query && { query: params.query }),
          ...(params.details && { details: params.details }),
        },
      });
    }

    queryRef.current = params.query;
    saveSearchQuery(queryRef.current);
    return (): void => {
      saveSearchQuery(queryRef.current);
    };
  }, [params]);

  return { params, setParams };
};
