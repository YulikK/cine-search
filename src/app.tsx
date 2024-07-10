import React, { useEffect, useState } from 'react';
import { SearchBar } from './components/search-bar.tsx';
import { ListView } from './components/list-view.tsx';
import { ApiService } from './services/api.tsx';
import { MoviesItem, QueryParams } from './types/api.tsx';
import { DEFAULT_PAGE } from './common/constant.tsx';
import { getSearchQuery, saveSearchQuery } from './services/storage.tsx';
import { Loader } from './components/loader.tsx';
import { ErrorBoundary } from './components/error-boundary.tsx';
import { Pagination } from './components/pagination.tsx';

export const App: React.FC = () => {
  const [movies, setMovies] = useState<MoviesItem[]>([]);
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(getSearchQuery());
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  // function onSearch(query: string): void {
  //   setSearchQuery(query);
  // }

  useEffect(() => {
    saveSearchQuery(searchQuery);
    const queryParams = {
      query: searchQuery,
      page,
    };
    getMovie(queryParams);
  }, [searchQuery, page]);

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <SearchBar
          // onSearch={onSearch}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
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
