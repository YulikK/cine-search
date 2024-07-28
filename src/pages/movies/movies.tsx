import React, { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DEFAULT_PAGE } from '../../common/constant.tsx';
import { useRequestParams } from '../../hooks/use-request-params.tsx';
import { useGetMovieQuery } from '../../services/api.tsx';
import { Loader } from '../../components/loader/loader.tsx';
import { ListView } from '../../components/list-view/list-view.tsx';
import { Pagination } from '../../components/pagination/pagination.tsx';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.tsx';
import { SearchBar } from '../../components/search-bar/search-bar.tsx';
import { useTheme } from '../../hooks/use-theme.tsx';
import { FavoritePopup } from '../../components/popup-favorite/popup-favorite.tsx';

export const Movies: React.FC = () => {
  const { searchParams } = useRequestParams();
  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10);
  const { data, error, isLoading } = useGetMovieQuery({ query, page });
  const { results, totalPages } = data || {};
  const { isDarkTheme } = useTheme();
  const movieRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const [selectedMovieId, setSelectedMovieId] = useState('');

  const setMovieRef = (id: string, ref: HTMLLIElement | null): void => {
    movieRefs.current[id] = ref;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [searchParams]);

  useEffect(() => {
    if (selectedMovieId && movieRefs.current[selectedMovieId]) {
      movieRefs.current[selectedMovieId].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [selectedMovieId]);

  const renderContent = (): React.ReactElement => {
    if (isLoading) return <Loader />;
    if (error) return <div>Error loading movies</div>;

    return (
      <>
        <ListView
          data={results || []}
          setMovieRef={setMovieRef}
          setSelectedMovieId={setSelectedMovieId}
        />
        <Pagination
          currentPage={page}
          totalPages={totalPages || DEFAULT_PAGE}
        />
        <FavoritePopup />
      </>
    );
  };

  return (
    <ErrorBoundary>
      <div
        data-theme={isDarkTheme ? 'dark' : 'light'}
        className="flex bg-muted w-full"
      >
        <div className="flex-1 flex">
          <div className="flex-1 border-r p-4 overflow-y-auto">
            <SearchBar />
            {renderContent()}
          </div>
          <Outlet />
        </div>
      </div>
    </ErrorBoundary>
  );
};
