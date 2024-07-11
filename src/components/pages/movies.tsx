import React, { useEffect, useState } from 'react';
import { SearchBar } from '../search-bar.tsx';
import { ListView } from '../list-view.tsx';
import { ApiService } from '../../services/api.tsx';
import { MoviesItem, QueryParams } from '../../types/api.tsx';
import { DEFAULT_PAGE } from '../../common/constant.tsx';
import { Loader } from '../loader.tsx';
import { ErrorBoundary } from '../error-boundary.tsx';
import { Pagination } from '../pagination.tsx';
import { useRequestParams } from '../../hooks/use-request-params.tsx';

export const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MoviesItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { page, setPage, searchQuery, setSearchQuery } = useRequestParams();

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
      query: searchQuery,
      page,
    };
    getMovie(queryParams);
  }, [searchQuery, page, setTotalPages]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {isLoading ? <Loader /> : <ListView data={movies} />}
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </ErrorBoundary>
  );
};
