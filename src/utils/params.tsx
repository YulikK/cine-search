import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { DEFAULT_DETAILS, DEFAULT_PAGE } from '../common/constant.tsx';
import { QueryParams } from '../types/api.tsx';

type queryType = string | string[] | undefined | null;
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
  page: queryType,
  query: queryType,
  details: queryType
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

export function setParams(
  router: AppRouterInstance,
  params: QueryParams
): void {
  const query = {
    ...(params.page && { page: params.page.toString() }),
    ...(params.query && { query: params.query }),
    ...(params.details && { details: params.details.toString() }),
  };

  const queryString = new URLSearchParams(query).toString();

  router.push(`/?${queryString}`);
}
