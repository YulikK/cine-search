import React, { useEffect, useRef } from 'react';
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
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/query';
import { getSearchQuery, saveSearchQuery } from '../services/storage';
import { MovieCardDetails } from '../components/movie-card-details/movie-card-details';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { query, page, details } = context.query;
    const params = getParams(page, query, details);
    await store.dispatch(getMovie.initiate(params));
    if (params.details) {
      await store.dispatch(getMovieByID.initiate(params.details));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {},
    };
  }
);

const Movies: React.FC = () => {
  const router = useRouter();
  const { page, query, details } = router.query;
  const params = getParams(page, query, details);
  const { results: movieList, totalPages } =
    useGetMovieQuery(params ?? skipToken).data || {};
  const movieDetails = params.details
    ? useGetMovieByIDQuery(params.details ?? skipToken).data
    : null;
  const { isDarkTheme } = useTheme();
  const movieRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const setMovieRef = (id: number, ref: HTMLLIElement | null): void => {
    movieRefs.current[id] = ref;
  };
  if (!query && !page && !details) {
    const savedQuery = getSearchQuery('');
    if (savedQuery) {
      handleQueryChange(savedQuery);
    }
  }

  useEffect(() => {
    const handleRouteChange = () => {
      const params = new URLSearchParams(window.location.href.split('?')[1]);
      const details = params.get('details');

      if (details && movieRefs.current[details]) {
        requestAnimationFrame(() => {
          movieRefs.current[details]?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
          });
        });
      }
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    handleRouteChange();

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  function handleQueryChange(newSearchQuery: string) {
    const newParams = {
      ...params,
      query: newSearchQuery,
      page: DEFAULT_PAGE,
    };
    saveSearchQuery(newSearchQuery);
    setParams(router, newParams);
  }

  function handlePageChange(page: number) {
    const newParams = {
      ...params,
      page,
    };
    setParams(router, newParams);
  }

  function handleDetailsClose(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    const newParams = {
      ...params,
      details: DEFAULT_DETAILS,
    };
    setParams(router, newParams);
  }

  function handleDetailsOpen(details: number) {
    const newParams = {
      ...params,
      details,
    };
    setParams(router, newParams);
  }
  const renderContent = (): React.ReactElement => {
    return (
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
  };

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
