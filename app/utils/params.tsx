import { DEFAULT_PAGE } from '~/common/constant';
import { QueryParams } from '~/types/api';

type queryType = string | string[] | undefined | null;

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

export function setParams(params: QueryParams): string {
  const query = {
    ...(params.page && { page: params.page.toString() }),
    ...(params.query && { query: params.query }),
    ...(params.details && { details: params.details.toString() }),
  };

  const queryString = new URLSearchParams(query).toString();

  return queryString;
}
