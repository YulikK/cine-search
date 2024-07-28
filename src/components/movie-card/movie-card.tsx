import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import { MoviesItem } from '../../types/api.tsx';
import { URL_POSTER } from '../../common/constant.tsx';
import { StarIcon } from '../icons/star-icon/star-icon.tsx';
import NO_POSTER_IMG from '../../assets/img/placeholder.svg';
import { FavoriteButton } from '../button-favorite/button-favorite.tsx';
import { useRequestParams } from '../../hooks/use-request-params.tsx';

interface MovieCardProps {
  movie: MoviesItem;
  setRef: (ref: HTMLLIElement | null) => void;
  setSelectedMovieId: (id: string) => void;
}

export const MovieCard: React.FC<MovieCardProps> = (props) => {
  const { movie } = props;
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useRequestParams();
  const handleMovieClick: React.MouseEventHandler<HTMLLIElement> = (evt) => {
    const isClickInsideFavoriteButton = (
      target: HTMLElement | SVGElement | null
    ): boolean => {
      let element: HTMLElement | SVGElement | null = target;
      while (element && element !== evt.currentTarget) {
        if (
          element.tagName === 'BUTTON' &&
          element.classList.contains('favorite-button')
        ) {
          return true;
        }
        element = element.parentElement;
      }
      return false;
    };

    if (
      evt.target instanceof SVGElement &&
      isClickInsideFavoriteButton(evt.target)
    ) {
      return;
    }

    props.setSelectedMovieId(movie.id);
    const saveSearchParams = new URLSearchParams(searchParams.toString());
    navigate(`/${movie.id}`);
    setSearchParams(Object.fromEntries(saveSearchParams.entries()));
  };

  return (
    <li
      key={movie.id}
      ref={props.setRef}
      className="cursor-pointer rounded-md bg-background p-4 hover:drop-shadow-md flex flex-col items-start gap-4 w-[330px]"
      onClick={handleMovieClick}
    >
      <img
        src={
          movie.posterPath ? `${URL_POSTER}${movie.posterPath}` : NO_POSTER_IMG
        }
        alt={movie.name}
        width="300"
        height="450"
        className={classNames(
          'w-full',
          'h-[450px]',
          'w-[300px]',
          'object-contain',
          {
            noPoster: !movie.posterPath,
            'object-cover': !movie.posterPath,
          }
        )}
        style={{ aspectRatio: '300 / 450' }}
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
