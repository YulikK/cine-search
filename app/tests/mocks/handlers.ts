import movies from './handlers/movies';
import movieDetails from './handlers/movie-details';

export const handlers = [...movies, ...movieDetails];
