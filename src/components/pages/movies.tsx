import React, { useEffect, useState } from 'react';
import { ListView } from '../list-view.tsx';
import { ApiService } from '../../services/api.tsx';
import { MoviesItem, QueryParams } from '../../types/api.tsx';
import { DEFAULT_PAGE } from '../../common/constant.tsx';
import { Loader } from '../loader.tsx';
import { Pagination } from '../pagination.tsx';
import { useRequestParams } from '../../hooks/use-request-params.tsx';

export const Movies: React.FC = () => {
  const [movies, setMovies] = useState<MoviesItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(DEFAULT_PAGE);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { searchParams } = useRequestParams();

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

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ListView data={movies} />
          <Pagination
            currentPage={parseInt(
              searchParams.get('page') || `${DEFAULT_PAGE}`,
              10
            )}
            totalPages={totalPages}
          />
        </>
      )}
    </>
  );
};
