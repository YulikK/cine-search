import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { RootState } from '../../store/store.tsx';
import { HeartIcon } from '../icons/heart-icon/heart-icon.tsx';
import { DownloadIcon } from '../icons/download-icon/download-icon.tsx';
import { TrashIcon } from '../icons/trash-icon/trash-icon.tsx';
import { clearFavorites } from '../../store/reducers/favorites.tsx';

export const FavoritePopup: React.FC = () => {
  const favorites: string[] = useSelector(
    (state: RootState) => state.favorites
  );
  const dispatch = useDispatch();

  const handleClearFavorites = (): void => {
    dispatch(clearFavorites());
  };

  return (
    <>
      {favorites.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-background rounded-full shadow-md w-16 h-16 flex items-start justify-center hover:w-16 hover:h-36 transition-all duration-300 group">
          <div className="flex items-center justify-center gap-4 flex-col px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="text-secondary-foreground hover:text-destructive">
              <DownloadIcon className="w-6 h-6" />
            </button>
            <button
              className="text-secondary-foreground hover:text-destructive"
              onClick={handleClearFavorites}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
          <div className="fixed bottom-4 bg-primary right-4 rounded-full px-3 py-3 flex items-center gap-2 shadow-lg">
            <HeartIcon className="w-10 h-10 text-primary-foreground" />
            <div className="absolute top-0.5 right-0.5 bg-background text-primary-foreground rounded-full shadow-md">
              <span className="text-sm font-medium px-2 text-primary ">
                {favorites.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
