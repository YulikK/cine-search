import React from 'react';
import { MoviesItem } from '../types/api';
import { URL_POSTER } from '../common/constant';
import StarIcon from './star-icon';

interface Props {
  movie: MoviesItem;
}

export class MovieCard extends React.Component<Props> {
  render() {
    const { movie } = this.props;

    return (
      <li className="bg-background rounded-lg overflow-hidden shadow-lg">
        <img
          src={`${URL_POSTER}${movie.posterPath}`}
          alt={movie.name}
          width="300"
          height="450"
          className="w-full h-[450px] object-cover"
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
  }
}
