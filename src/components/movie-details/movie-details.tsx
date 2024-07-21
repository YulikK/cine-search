import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetMovieByIDQuery } from '../../services/api.tsx';
import { MovieCardDetails } from '../movie-card-details/movie-card-details.tsx';
import { Loader } from '../loader/loader.tsx';
import { NoResults } from '../no-results/no-results.tsx';

export const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const {
    data: selectedMovie,
    error,
    isLoading: isDetailLoading,
  } = useGetMovieByIDQuery(movieId ?? '');

  useEffect(() => {
    if (!movieId || Number.isNaN(Number(movieId))) {
      navigate('/404', { replace: true });
    }
  }, [movieId, navigate]);

  if (isDetailLoading) {
    return (
      <div className="flex-1 bg-background p-6 ">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 bg-background p-6 ">
        <NoResults />
      </div>
    );
  }

  if (!selectedMovie) {
    return (
      <div className="flex-1 bg-background p-6 ">
        <NoResults />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background p-6 overflow-y-auto h-screen sticky top-0">
      <MovieCardDetails movie={selectedMovie} />
    </div>
  );
};
