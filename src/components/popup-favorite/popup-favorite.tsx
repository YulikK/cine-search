import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { saveAs } from 'file-saver';
import { RootState } from '../../store/store.tsx';
import { HeartIcon } from '../icons/heart-icon/heart-icon.tsx';
import { DownloadIcon } from '../icons/download-icon/download-icon.tsx';
import { TrashIcon } from '../icons/trash-icon/trash-icon.tsx';
import { clearFavorites } from '../../store/reducers/favorites.tsx';
import { MoviesItem } from '../../types/api.tsx';
import useBaseUrl from '../../hooks/use-base-url.tsx';

export const FavoritePopup: React.FC = () => {
  const favorites: MoviesItem[] = useSelector(
    (state: RootState) => state.favorites
  );
  const dispatch = useDispatch();
  const baseUrl = useBaseUrl();

  const handleClearFavorites = (): void => {
    dispatch(clearFavorites());
  };

  const handleDownloadFavorites = (): void => {
    // let csvContent = 'data:text/csv;charset=utf-8,';
    let csvContent = 'id;Name;Description;Rating;URL\n';

    favorites.forEach((favorite) => {
      const detailUrl = `${baseUrl}/${favorite.id}`;
      const row = `${favorite.id};${favorite.name};${favorite.description};${favorite.rating};${detailUrl}`;
      csvContent += `${row}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, `${favorites.length}_movies.csv`);
  };

  return (
    <>
      {favorites.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-background rounded-full shadow-md w-16 h-16 flex items-start justify-center hover:w-16 hover:h-36 transition-all duration-300 group z-10">
          <div className="flex items-center justify-center gap-4 flex-col px-3 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              className="text-secondary-foreground hover:text-destructive"
              onClick={handleDownloadFavorites}
            >
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
