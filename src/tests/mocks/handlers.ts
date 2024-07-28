import movies from './handlers/movies.ts';
import movieDetails from './handlers/movie-details.ts';

export const handlers = [...movies, ...movieDetails];
