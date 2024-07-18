import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetMovieByIDQuery } from '../../services/api.tsx';
import { MovieCardDetails } from '../movie-card-details/movie-card-details.tsx';
import { Loader } from '../loader/loader.tsx';
import { NoResults } from '../no-results/no-results.tsx';

export const MovieDetails: React.FC = () => {
  const { movieId } = useParams();

  const {
    data: selectedMovie,
    error,
    isLoading: isDetailLoading,
  } = useGetMovieByIDQuery(movieId ?? '');

  if (isDetailLoading) {
    return (
      <div className="flex-1 bg-background p-6 overflow-y-auto">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-background p-6 overflow-y-auto">
        Error fetching data
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="flex-1 bg-background p-6 overflow-y-auto">
        <NoResults />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background p-6 overflow-y-auto">
      <MovieCardDetails movie={selectedMovie} />
    </div>
  );
};
