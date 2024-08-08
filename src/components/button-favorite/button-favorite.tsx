import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { HeartIcon } from '../icons/heart-icon/heart-icon.tsx';
import {
  addFavorite,
  removeFavorite,
} from '../../store/reducers/favorites.tsx';
import { RootState } from '../../store/store.tsx';
import { MoviesItem } from '../../types/api.tsx';

export const FavoriteButton: React.FC<{ movie: MoviesItem }> = (props) => {
  const dispatch = useDispatch();
  const favorites: MoviesItem[] = useSelector(
    (state: RootState) => state.favorites
  );
  const isFavorite = favorites.some(
    (favorite) => favorite.id === props.movie.id
  );

  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(props.movie));
    } else {
      dispatch(addFavorite(props.movie));
    }
  };

  return (
    <button
      className="favorite-button rounded-full  text-gray-900"
      onClick={handleFavorite}
    >
      <HeartIcon
        className={classNames(
          'w-5',
          'h-5',
          'text-destructive',
          'hover:fill-destructive',
          {
            'text-destructive': isFavorite,
            'fill-destructive': isFavorite,
          }
        )}
      />
      <span className="sr-only">
        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      </span>
    </button>
  );
};
