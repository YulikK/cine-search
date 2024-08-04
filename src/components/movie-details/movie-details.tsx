import React, { useEffect } from 'react';
import { MovieCardDetails } from '../movie-card-details/movie-card-details.tsx';
import { NoResults } from '../no-results/no-results.tsx';
import { useRouter } from 'next/router';
import { MoviesDetails } from '../../types/api.tsx';

interface MovieDetailsProps {
  selectedMovie: MoviesDetails;
}
export const MovieDetails: React.FC<MovieDetailsProps> = (
  props: MovieDetailsProps
) => {
  const router = useRouter();

  useEffect(() => {
    if (
      !props.selectedMovie.id ||
      Number.isNaN(Number(props.selectedMovie.id))
    ) {
      router.push('/404');
    }
  }, [props.selectedMovie.id]);

  if (!props.selectedMovie) {
    return (
      <div className="flex-1 bg-background p-6 ">
        <NoResults />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background p-6 overflow-y-auto h-screen sticky top-0">
      <MovieCardDetails movie={props.selectedMovie} />
    </div>
  );
};
