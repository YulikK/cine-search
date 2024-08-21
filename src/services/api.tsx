import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { Action, PayloadAction } from '@reduxjs/toolkit';
import {
  JSON_ACCEPT_HEADER,
  TOKEN,
  URL_API,
  URL_SEARCH_API,
  DEFAULT_MOVIE_LIST,
} from '../common/constant';
import {
  Movie,
  MovieAdaptResponse,
  MoviesDetails,
  MoviesDetailsServerResponse,
  QueryParams,
} from '../types/api';
import { RootStateApi } from '../types/store';

const baseQuery = fetchBaseQuery({
  baseUrl: URL_API,
  prepareHeaders: (headers) => {
    headers.set('Authorization', `Bearer ${TOKEN}`);
    headers.set('Accept', JSON_ACCEPT_HEADER);
    return headers;
  },
});
function isHydrateAction(
  action: Action
): action is PayloadAction<RootStateApi> {
  return action.type === HYDRATE;
}

export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery,
  extractRehydrationInfo(action, { reducerPath }) {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
    return undefined;
  },
  endpoints: (builder) => ({
    getMovie: builder.query<MovieAdaptResponse, QueryParams>({
      query: (params) => {
        const url = params.query
          ? URL_SEARCH_API
          : `${URL_API}/${DEFAULT_MOVIE_LIST}`;
        const page = params.page ? params.page : 1;
        let result = `${url}?page=${page}`;
        if (params.query) {
          result += `&query=${encodeURIComponent(params.query)}`;
        }
        return result;
      },
      transformResponse: (response: {
        results: Movie[];
        total_pages: number;
      }): MovieAdaptResponse => ({
        totalPages: response.total_pages,
        results: response.results.map((item) => ({
          id: parseInt(item.id.toString(), 10),
          name: item.title,
          description: item.overview,
          posterPath: item.poster_path || '',
          rating: parseFloat(item.vote_average.toFixed(1)),
        })),
      }),
    }),
    getMovieByID: builder.query<MoviesDetails, number>({
      query: (id) => `${URL_API}/${id}`,
      transformResponse: (
        response: MoviesDetailsServerResponse
      ): MoviesDetails => ({
        id: response.id.toString(),
        title: response.title,
        overview: response.overview,
        backdropPath: response.backdrop_path,
        posterPath: response.poster_path,
        genres: response.genres.map((genre) => genre.name),
        originalLanguage: response.original_language,
        releaseDate: new Date(response.release_date).toLocaleDateString(
          'en-US',
          {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }
        ),
        adult: response.adult,
        budget: response.budget,
        revenue: response.revenue,
        runtime: `${Math.floor(response.runtime / 60)}h ${
          response.runtime % 60
        }m`,
        status: response.status,
        tagline: response.tagline,
        voteAverage: parseFloat(response.vote_average.toFixed(1)),
      }),
    }),
  }),
});

export const {
  useGetMovieQuery,
  useGetMovieByIDQuery,
  util: { getRunningQueriesThunk },
} = moviesApi;
export const { middleware: moviesApiMiddleware } = moviesApi;
export const { getMovie, getMovieByID } = moviesApi.endpoints;
