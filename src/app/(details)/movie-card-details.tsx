import React from 'react';
import { MoviesDetails } from '../../types/api.tsx';
import { ApiService } from '../../services/api.tsx';
import { NoResults } from '../../components/no-results/no-results.tsx';
import { DetailsView } from '../../components/details-card-view/details-card-view.tsx';

interface MovieDetailsProps {
  details: number;
}

export const getData = async (
  details: number
): Promise<MoviesDetails | null> => {
  const movieDetails = details
    ? await ApiService.fetchMovieByID(details)
    : null;
  return movieDetails;
};

export const MovieCardDetails = async (
  props: MovieDetailsProps
): Promise<React.ReactElement> => {
  const selectedMovie = await getData(props.details);

  if (!selectedMovie) {
    return <NoResults />;
  }

  return <DetailsView movie={selectedMovie} />;
};
