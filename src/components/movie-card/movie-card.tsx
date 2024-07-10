import React from 'react';
import { MoviesItem } from '../../types/api.tsx';
import { URL_POSTER } from '../../common/constant.tsx';
import { StarIcon } from '../icons/star-icon.tsx';
import styles from './movie-card.module.scss';
import NO_POSTER_IMG from '../../assets/img/placeholder.svg';

interface MovieCardProps {
  movie: MoviesItem;
}

export const MovieCard: React.FC<MovieCardProps> = (props) => {
  const { movie } = props;

  return (
    <li className="bg-background rounded-lg overflow-hidden shadow-lg">
      <img
        src={
          movie.posterPath ? `${URL_POSTER}${movie.posterPath}` : NO_POSTER_IMG
        }
        alt={movie.name}
        width="300"
        height="450"
        className={`w-full h-[450px] object-cover ${movie.posterPath ? '' : styles.noPoster}`}
        style={{ aspectRatio: '300 / 450', objectFit: 'cover' }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.name}</h3>
        <div className="flex items-center mb-2">
          <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
          <span className="text-sm font-medium">{movie.rating}</span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {movie.description}
        </p>
      </div>
    </li>
  );
};
