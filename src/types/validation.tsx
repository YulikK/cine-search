import { MoviesDetailsServerResponse, MovieServerResponse } from './api.tsx';

export function isMovieListData(data: unknown): data is MovieServerResponse {
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

export function isMovieDetailsData(
  data: unknown
): data is MoviesDetailsServerResponse {
  return Boolean(
    typeof data === 'object' &&
      data &&
      'id' in data &&
      'title' in data &&
      'overview' in data &&
      'backdrop_path' in data &&
      'poster_path' in data &&
      'genres' in data &&
      'original_language' in data &&
      'release_date' in data &&
      'adult' in data &&
      'budget' in data &&
      'revenue' in data &&
      'runtime' in data &&
      'status' in data &&
      'tagline' in data &&
      'vote_average' in data
  );
}
