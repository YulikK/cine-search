import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { HeartIcon } from '../icons/heart-icon/heart-icon';
import { addFavorite, removeFavorite } from '../../store/reducers/favorites';
import { RootState } from '../../store/store';
import { MoviesItem } from '../../types/api';

export const FavoriteButton: React.FC<{ movie: MoviesItem }> = (props) => {
  const { movie } = props;
  const dispatch = useDispatch();
  const favorites: MoviesItem[] = useSelector(
    (state: RootState) => state.favorites
  );
  const isFavorite = favorites.some((favorite) => favorite.id === movie.id);

  const handleFavorite = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.stopPropagation();
    if (isFavorite) {
      dispatch(removeFavorite(movie));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  return (
    <button
      className="favorite-button rounded-full  text-gray-900"
      onClick={handleFavorite}
      type="button"
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
