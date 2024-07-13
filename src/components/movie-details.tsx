import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MoviesDetails } from '../types/api.tsx';
import { ApiService } from '../services/api.tsx';
import { MovieCardDetails } from './movie-card-details.tsx';
import { Loader } from './loader.tsx';

export const MovieDetails: React.FC = () => {
  const { movieId } = useParams();
  const [selectedMovie, setSelectedMovie] = useState<MoviesDetails | null>(
    null
  );
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);

  useEffect(() => {
    function getMovieById(id: string): void {
      setIsDetailLoading(true);
      ApiService.fetchMovieByID(id)
        .then((movieData) => {
          setSelectedMovie(movieData);
          setIsDetailLoading(false);
        })
        .catch((error: Error) => {
          console.error('Error fetching data:', error);
        });
    }

    if (movieId) {
      getMovieById(movieId);
    } else {
      setSelectedMovie(null);
    }
  }, [movieId]);

  return (
    <div className="flex-1 bg-background p-6 overflow-y-auto">
      {isDetailLoading ? (
        <Loader />
      ) : (
        <>
          {selectedMovie ? (
            <MovieCardDetails movie={selectedMovie} />
          ) : (
            <>
              <p>Not found film </p>
            </>
          )}
        </>
      )}
    </div>
  );
};
