import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetMovieByIDQuery } from '../../services/api.tsx';
import { MovieCardDetails } from '../movie-card-details/movie-card-details.tsx';
import { Loader } from '../loader/loader.tsx';
import { NoResults } from '../no-results/no-results.tsx';
import {
  clearMovieDetails,
  setMovieDetails,
} from '../../store/reducers/details.tsx';
import { useRouter } from 'next/router';

interface MovieDetailsProps {
  movieId: number;
}
export const MovieDetails: React.FC<MovieDetailsProps> = (
  props: MovieDetailsProps
) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    data: selectedMovie,
    error,
    isLoading: isDetailLoading,
  } = useGetMovieByIDQuery(props.movieId?.toString() ?? '');

  useEffect(() => {
    if (!props.movieId || Number.isNaN(Number(props.movieId))) {
      router.push('/404');
    }
  }, [props.movieId]);

  useEffect(() => {
    if (selectedMovie) {
      dispatch(setMovieDetails(selectedMovie));
    }

    return (): void => {
      dispatch(clearMovieDetails());
    };
  }, [dispatch, selectedMovie]);

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
