import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';
import { GetServerSideProps } from 'next';
import {
  getMovie,
  getMovieByID,
  getRunningQueriesThunk,
  useGetMovieByIDQuery,
  useGetMovieQuery,
} from '../services/api';
import { ListView } from '../components/list-view/list-view';
import { Pagination } from '../components/pagination/pagination';
import { DEFAULT_DETAILS, DEFAULT_PAGE } from '../common/constant';
import { FavoritePopup } from '../components/popup-favorite/popup-favorite';
import { SearchBar } from '../components/search-bar/search-bar';
import { useTheme } from '../hooks/theme-provider';
import { wrapper } from '../store/store';
import { getParams, setParams } from '../utils/params';
import { getSearchQuery, saveSearchQuery } from '../services/storage';
import { MovieCardDetails } from '../components/movie-card-details/movie-card-details';

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps((store) => async (context) => {
    const { query, page, details } = context.query;
    const params = getParams(page, query, details);

    await store.dispatch(getMovie.initiate(params));

    const moviePromise = store.dispatch(getMovie.initiate(params));
    const movieByIDPromise = params.details
      ? store.dispatch(getMovieByID.initiate(params.details))
      : Promise.resolve();

    await Promise.all([moviePromise, movieByIDPromise]);

    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  });

const Movies: React.FC = () => {
  const router = useRouter();
  const { page, query, details } = router.query;
  const params = getParams(page, query, details);
  const { results: movieList, totalPages } =
    useGetMovieQuery(params ?? skipToken).data || {};

  const movieDetailsQuery = useGetMovieByIDQuery(
    params.details !== 0 ? params.details : skipToken
  );
  const movieDetails = params.details ? movieDetailsQuery.data : null;
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

  const renderMovieDetails = () => {
    if (movieDetails) {
      return (
        <MovieCardDetails
          movie={movieDetails}
          handleDetailsClose={handleDetailsClose}
        />
      );
    }
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
