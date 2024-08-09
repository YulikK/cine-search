import {
  BaseQueryFn,
  CombinedState,
  FetchArgs,
  FetchBaseQueryError,
  QueryDefinition,
} from '@reduxjs/toolkit/query';
import {
  MovieAdaptResponse,
  MoviesDetails,
  MoviesItem,
  QueryParams,
} from './api';

export type RootStateApi = {
  favorites: MoviesItem[];
  moviesApi: CombinedState<
    {
      getMovie: QueryDefinition<
        QueryParams,
        BaseQueryFn<
          string | FetchArgs,
          unknown,
          FetchBaseQueryError,
          object,
          object
        >,
        never,
        MovieAdaptResponse,
        'moviesApi'
      >;
      getMovieByID: QueryDefinition<
        number,
        BaseQueryFn<
          string | FetchArgs,
          unknown,
          FetchBaseQueryError,
          object,
          object
        >,
        never,
        MoviesDetails,
        'moviesApi'
      >;
    },
    never,
    'moviesApi'
  >;
};
