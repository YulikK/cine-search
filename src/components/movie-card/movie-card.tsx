import React from 'react';
import classNames from 'classnames';
import Image from 'next/image';
import { MoviesItem } from '../../types/api.tsx';
import { URL_POSTER } from '../../common/constant.tsx';
import { StarIcon } from '../icons/star-icon/star-icon.tsx';
import { FavoriteButton } from '../button-favorite/button-favorite.tsx';

interface MovieCardProps {
  movie: MoviesItem;
  setRef: (ref: HTMLLIElement | null) => void;
  handleDetailsOpen: (details: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = (props) => {
  const { movie } = props;

  function onClick(event: React.MouseEvent<HTMLLIElement>): void {
    event.stopPropagation();
    props.handleDetailsOpen(movie.id);
  }
  return (
    <li
      key={movie.id}
      ref={props.setRef}
      onClick={onClick}
      className="cursor-pointer rounded-md bg-background p-4 hover:drop-shadow-md flex flex-col items-start gap-4 w-[330px]"
    >
      <Image
        src={
          movie.posterPath
            ? `${URL_POSTER}${movie.posterPath}`
            : '/images/placeholder.svg'
        }
        alt={movie.name}
        height={450}
        width={300}
        className={classNames('w-full', 'w-[300px]', 'object-contain', {
          noPoster: !movie.posterPath,
          'object-cover': !movie.posterPath,
        })}
      />
      <div className="p-4 w-full">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold mb-2 text-foreground">
            {movie.name}
          </h3>
          <FavoriteButton movie={movie} />
        </div>
        <div className="flex items-center mb-2">
          <StarIcon className="h-5 w-5 text-yellow-500 mr-1" />
          <span className="text-sm font-medium text-muted-foreground">
            {movie.rating}
          </span>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {movie.description}
        </p>
      </div>
    </li>
  );
};
