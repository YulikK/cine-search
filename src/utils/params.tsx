import { NextRouter } from 'next/router';
import { DEFAULT_DETAILS, DEFAULT_PAGE } from '../common/constant';
import { QueryParams } from '../types/api';

type queryType = string | string[] | undefined;
type queryParamsType = {
  query: queryType;
  page: queryType;
  details: queryType;
};

export function updateParams(
  params: string,
  value: string,
  searchParams: URLSearchParams
): { [k: string]: string } {
  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.set(params, value);
  return Object.fromEntries(newSearchParams.entries());
}

export function getParams(
  router: NextRouter,
  defaultQuery?: string
): QueryParams {
  const urlQuery = Array.isArray(router.query.query)
    ? router.query.query[0]
    : router.query.query;
  const urlPage = router.query.page;
  const urlDetails = router.query.details;

  const currentQuery: string = (urlQuery ? urlQuery : defaultQuery) || '';
  const currentPage = parseInt(
    Array.isArray(urlPage) ? urlPage[0] : urlPage || DEFAULT_PAGE.toString(),
    10
  );
  const currentDetails: number = parseInt(
    Array.isArray(urlDetails) ? urlDetails[0] : urlDetails || '0',
    10
  );
  const queryParams: QueryParams = {
    query: currentQuery,
    page: currentPage,
    details: currentDetails,
  };
  return queryParams;
}

export function parseParams(queryParams: queryParamsType): QueryParams {
  const { query, page, details } = queryParams;
  const urlQuery = Array.isArray(query) ? query[0] : query;
  const urlPage = Array.isArray(page) ? page[0] : page;
  const urlDetails = Array.isArray(details) ? details[0] : details;

  const currentQuery = urlQuery || '';
  const currentPage = parseInt(urlPage || DEFAULT_PAGE.toString(), 10);
  const currentDetails = parseInt(urlDetails || DEFAULT_DETAILS.toString(), 10);
  const params: QueryParams = {
    query: currentQuery,
    page: currentPage,
    details: currentDetails,
  };
  return params;
}
