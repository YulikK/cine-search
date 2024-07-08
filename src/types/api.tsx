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

export interface MoviesItem {
  id: string;
  name: string;
  description: string;
  posterPath: string;
  rating: number;
}

export interface QueryParams {
  query: string;
  page: number;
}