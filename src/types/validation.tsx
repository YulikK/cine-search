import { MovieServerResponse } from './api.tsx';

export function isMovieData(data: unknown): data is MovieServerResponse {
  return Boolean(
    typeof data === 'object' &&
      data &&
      'page' in data &&
      typeof data.page === 'number' &&
      'total_pages' in data &&
      typeof data.total_pages === 'number' &&
      'total_results' in data &&
      typeof data.total_results === 'number' &&
      'results' in data &&
      typeof Array.isArray(data.results)
  );
}
