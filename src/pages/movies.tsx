import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { MoviesItem, QueryParams } from '../types/api.tsx';
import { DEFAULT_PAGE } from '../common/constant.tsx';
import { useRequestParams } from '../hooks/use-request-params.tsx';
import { ApiService } from '../services/api.tsx';
import { Loader } from '../components/loader.tsx';
import { ListView } from '../components/list-view.tsx';
import { Pagination } from '../components/pagination.tsx';
import { ErrorBoundary } from '../components/error-boundary.tsx';
import { SearchBar } from '../components/search-bar.tsx';

export const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MoviesItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useRequestParams();

  useEffect(() => {
    function getMovie(queryParams: QueryParams): void {
      setIsLoading(true);
      ApiService.fetchMovie(queryParams)
        .then((moviesData) => {
          if (moviesData) {
            setMovies(moviesData.results);
            setTotalPages(moviesData.totalPages);
          }
          setIsLoading(false);
        })
        .catch((error: Error) => {
          console.error('Error fetching data:', error);
        });
    }

    const queryParams = {
      query: searchParams.get('query') || '',
      page: parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10),
    };
    getMovie(queryParams);
  }, [searchParams, setTotalPages]);

  const handleMovieClick = (id: string): void => {
    const saveSearchParams = new URLSearchParams(searchParams.toString());
    navigate(`/${id}`);
    setSearchParams(Object.fromEntries(saveSearchParams.entries()));
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full">
        <div className="flex-1 border-r bg-muted p-4 overflow-y-auto">
          <SearchBar />
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <ListView data={movies} onMovieClick={handleMovieClick} />
              <Pagination
                currentPage={parseInt(
                  searchParams.get('page') || `${DEFAULT_PAGE}`,
                  10
                )}
                totalPages={totalPages}
              />
            </>
          )}
        </div>
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};
