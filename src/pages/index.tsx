import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next/types';
import { useSelector } from 'react-redux';
import { ApiService } from '../services/api.tsx';
import { ListView } from '../components/list-view/list-view.tsx';
import { Pagination } from '../components/pagination/pagination.tsx';
import { DEFAULT_DETAILS, DEFAULT_PAGE } from '../common/constant.tsx';
import { FavoritePopup } from '../components/popup-favorite/popup-favorite.tsx';
import { SearchBar } from '../components/search-bar/search-bar.tsx';
import { useTheme } from '../hooks/theme-provider.tsx';
import { RootState, wrapper } from '../store/store.tsx';
import { getParams, setParams } from '../utils/params.tsx';
import { getSearchQuery, saveSearchQuery } from '../services/storage.tsx';
import { MovieCardDetails } from '../components/movie-card-details/movie-card-details.tsx';

import {
  setMovieDetails,
  setMoviesList,
  setTotal,
} from '../store/reducers/movies.tsx';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { query, page, details } = context.query;
    const params = getParams(page, query, details);
    const movieData = await ApiService.fetchMovie(params);
    const movieDetails = params.details
      ? await ApiService.fetchMovieByID(params.details)
      : null;

    store.dispatch(setMoviesList(movieData?.results || []));
    store.dispatch(setTotal(movieData?.totalPages || 0));
    store.dispatch(setMovieDetails(movieDetails));

    return {
      props: {
        movieData,
        movieDetails,
      },
    };
  });

const Movies: React.FC = () => {
  const movieList = useSelector((state: RootState) => state.movies.list);
  const movieDetails = useSelector((state: RootState) => state.movies.details);
  const totalPages = useSelector((state: RootState) => state.movies.total);

  const router = useRouter();
  const { page, query, details } = router.query;
  const params = getParams(page, query, details);
  const { isDarkTheme } = useTheme();
  const movieRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const setMovieRef = (id: number, ref: HTMLLIElement | null): void => {
    movieRefs.current[id] = ref;
  };

  useEffect(() => {
    const handleRouteChange = (): void => {
      const paramsURL = new URLSearchParams(window.location.href.split('?')[1]);
      const detailsURL = paramsURL.get('details');

      if (detailsURL && movieRefs.current[detailsURL]) {
        requestAnimationFrame(() => {
          movieRefs.current[detailsURL]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange();

    return (): void => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  function handleQueryChange(newSearchQuery: string): void {
    const newParams = {
      ...params,
      query: newSearchQuery,
      page: DEFAULT_PAGE,
    };
    saveSearchQuery(newSearchQuery);
    setParams(router, newParams);
  }

  function handlePageChange(newPage: number): void {
    const newParams = {
      ...params,
      page: newPage,
    };
    setParams(router, newParams);
  }

  function handleDetailsClose(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    event.preventDefault();
    const newParams = {
      ...params,
      details: DEFAULT_DETAILS,
    };
    setParams(router, newParams);
  }

  function handleDetailsOpen(newDetails: number): void {
    const newParams = {
      ...params,
      details: newDetails,
    };
    setParams(router, newParams);
  }

  if (!query && !page && !details) {
    const savedQuery = getSearchQuery('');
    if (savedQuery) {
      handleQueryChange(savedQuery);
    }
  }

  const renderContent = (): React.ReactElement => (
    <>
      <ListView
        data={movieList || []}
        setMovieRef={setMovieRef}
        handleDetailsOpen={handleDetailsOpen}
      />
      <Pagination
        page={params.page}
        totalPages={totalPages || DEFAULT_PAGE}
        handlePageChange={handlePageChange}
      />
      <FavoritePopup />
    </>
  );

  const renderMovieDetails = (): React.ReactElement | null => {
    if (movieDetails) {
      return (
        <MovieCardDetails
          movie={movieDetails}
          handleDetailsClose={handleDetailsClose}
        />
      );
    }
    return null;
  };

  return (
    <div
      data-theme={isDarkTheme ? 'dark' : 'light'}
      className="flex bg-muted w-full"
    >
      <div className="flex-1 flex">
        <div className="flex-1 border-r p-4 overflow-y-auto">
          <SearchBar
            searchValue={params.query}
            handleQueryChange={handleQueryChange}
          />
          {renderContent()}
        </div>
        {renderMovieDetails()}
      </div>
    </div>
  );
};

export default Movies;
