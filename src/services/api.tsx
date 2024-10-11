import {
  JSON_ACCEPT_HEADER,
  HTTP_METHODS,
  TOKEN,
  URL_API,
  URL_SEARCH_API,
  DEFAULT_MOVIE_LIST,
} from '../common/constant.tsx';
import {
  Movie,
  MovieAdaptResponse,
  MoviesDetails,
  MoviesDetailsServerResponse,
  MoviesItem,
  QueryParams,
} from '../types/api.tsx';
import { isMovieDetailsData, isMovieListData } from '../types/validation.tsx';

export class ApiService {
  static async fetchMovie(
    params: QueryParams
  ): Promise<MovieAdaptResponse | null> {
    const fetchUrl = ApiService.makeURL(params);

    const data: unknown = await ApiService.getData(fetchUrl);
    if (isMovieListData(data)) {
      const result: MovieAdaptResponse = {
        totalPages: data.total_pages,
        results: ApiService.adaptListToClient(data.results),
      };
      return result;
    }
    return null;
  }

  static async fetchMovieByID(id: number): Promise<MoviesDetails | null> {
    const fetchUrl = `${URL_API}/${id}`;
    const data: unknown = await ApiService.getData(fetchUrl);
    if (isMovieDetailsData(data)) {
      const result: MoviesDetails = ApiService.adaptDetailsToClient(data);
      return result;
    }
    return null;
  }

  static async getData(url: string): Promise<unknown> {
    try {
      const response = await fetch(url, {
        method: HTTP_METHODS.GET,
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          accept: JSON_ACCEPT_HEADER,
        },
      });
      const data: unknown = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  static adaptListToClient(data: Movie[]): MoviesItem[] {
    return data.map((item) => ({
      id: Number(item.id),
      name: item.title,
      description: item.overview,
      posterPath: item.poster_path || '',
      rating: parseFloat(item.vote_average.toFixed(1)),
    }));
  }

  static adaptDetailsToClient(
    data: MoviesDetailsServerResponse
  ): MoviesDetails {
    const releaseDate = new Date(data.release_date);
    const formattedDate = releaseDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const hours = Math.floor(data.runtime / 60);
    const minutes = data.runtime % 60;

    return {
      id: data.id.toString(),
      title: data.title,
      overview: data.overview,
      backdropPath: data.backdrop_path,
      posterPath: data.poster_path,
      genres: data.genres.map((genre) => genre.name),
      originalLanguage: data.original_language,
      releaseDate: formattedDate,
      adult: data.adult,
      budget: data.budget,
      revenue: data.revenue,
      runtime: `${hours}h ${minutes}m`,
      status: data.status,
      tagline: data.tagline,
      voteAverage: parseFloat(data.vote_average.toFixed(1)),
    };
  }

  static makeURL(params: QueryParams): string {
    const url = params.query
      ? URL_SEARCH_API
      : `${URL_API}/${DEFAULT_MOVIE_LIST}`;
    const page = params.page ? params.page : 1;

    let result = `${url}?page=${page}`;

    if (params.query) {
      result += `&query=${encodeURIComponent(params.query)}`;
    }

    return result;
  }
}
