import { NextRouter } from 'next/router';
import { DEFAULT_DETAILS, DEFAULT_PAGE } from '../common/constant';
import { QueryParams } from '../types/api';

type QueryType = string | string[] | undefined;
type QueryParamsType = {
  query: QueryType;
  page: QueryType;
  details: QueryType;
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
  page: QueryType,
  query: QueryType,
  details: QueryType
): QueryParams {
  const urlQuery = Array.isArray(query) ? query[0] : query;
  const urlPage = page;
  const urlDetails = details;

  const currentQuery: string = urlQuery || '';
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

export function parseParams(queryParams: QueryParamsType): QueryParams {
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

export function setParams(router: NextRouter, params: QueryParams): void {
  router
    .push({
      query: {
        ...(params.page && { page: params.page }),
        ...(params.query && { query: params.query }),
        ...(params.details && { details: params.details }),
      },
    })
    .catch(console.error);
}
