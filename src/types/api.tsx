export interface Movie {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  original_language: string;
  original_title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_count: number;
  vote_average: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
}

export interface MovieServerResponse {
  page: number;
  total_results: number;
  total_pages: number;
  results: Movie[];
}
export interface MoviesItem {
  id: string;
  name: string;
  description: string;
  posterPath: string;
  rating: number;
}

export interface MoviesDetails {
  id: string;
  title: string;
  overview: string;
  backdropPath: string;
  posterPath: string;
  genres: string[];
  originalLanguage: string;
  releaseDate: string;
  adult: boolean;
  budget: number;
  revenue: number;
  runtime: string;
  status: string;
  tagline: string;
  voteAverage: number;
}

type genresServer = {
  id: number;
  name: string;
};

export interface MoviesDetailsServerResponse {
  id: string;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  genres: genresServer[];
  original_language: string;
  release_date: string;
  adult: boolean;
  budget: number;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  vote_average: number;
}

export interface MovieAdaptResponse {
  totalPages: number;
  results: MoviesItem[];
}
export interface QueryParams {
  query: string;
  page: number;
}
