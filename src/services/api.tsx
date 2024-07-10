import {
  JSON_ACCEPT_HEADER,
  HTTP_METHODS,
  TOKEN,
  URL_API,
  URL_SEARCH_API,
} from '../common/constant.tsx';
import { Movie, MoviesItem, QueryParams } from '../types/api.tsx';
import { isMovieData } from '../types/validation.tsx';

export class ApiService {
  static fetchMovie(params: QueryParams): Promise<MoviesItem[] | null> {
    const fetchUrl = ApiService.makeURL(params);
    return fetch(fetchUrl, {
      method: HTTP_METHODS.GET,
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        accept: JSON_ACCEPT_HEADER,
      },
    })
      .then((response: Response) => response.json())
      .then((data: unknown): MoviesItem[] | null => {
        if (isMovieData(data)) {
          return ApiService.adaptToClient(data.results);
        }
        return null;
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        return null;
      });
  }

  static adaptToClient(data: Movie[]): MoviesItem[] {
    return data.map((item) => ({
      id: item.id.toString(),
      name: item.title,
      description: item.overview,
      posterPath: item.poster_path || '',
      rating: item.vote_average,
    }));
  }

  static makeURL(params: QueryParams): string {
    const url = params.query ? URL_SEARCH_API : URL_API;
    const page = params.page ? params.page : 1;

    let result = `${url}?page=${page}`;

    if (params.query) {
      result += `&query=${encodeURIComponent(params.query)}`;
    }

    return result;
  }
}
