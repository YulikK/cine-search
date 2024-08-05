import React, { useEffect, useRef } from 'react';
import { moviesApi, useGetMovieQuery } from '../services/api';
import { Loader } from '../components/loader/loader';
import { ListView } from '../components/list-view/list-view';
import { Pagination } from '../components/pagination/pagination';
import { DEFAULT_PAGE } from '../common/constant';
import { FavoritePopup } from '../components/popup-favorite/popup-favorite';
import { SearchBar } from '../components/search-bar/search-bar';
import { MovieDetails } from '../components/movie-details/movie-details';
import { useRequestParamsContext } from '../hooks/params-provider';
import { useTheme } from '../hooks/theme-provider';
import { GetServerSideProps } from 'next';
import store from '../store/store';
import { parseParams } from '../utils/params';
import { MovieAdaptResponse, MoviesDetails } from '../types/api';
import { Router, useRouter } from 'next/router';

export interface MoviesProps {
  initialDataList: MovieAdaptResponse;
  initialDataDetails?: MoviesDetails;
}
export const getServerSideProps: GetServerSideProps<MoviesProps> = async (
  context
) => {
  const { dispatch } = store;
  const { query, page, details } = context.query;
  const params = parseParams({ query, page, details });
  const result = await dispatch(moviesApi.endpoints.getMovie.initiate(params));

  const movie = params.details
    ? await dispatch(
        moviesApi.endpoints.getMovieByID.initiate(params.details.toString())
      )
    : null;

  if (!result.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      initialDataList: result.data,
      ...(movie && { initialDataDetails: movie.data }),
    },
  };
};

const Movies: React.FC<MoviesProps> = ({
  initialDataList,
  initialDataDetails,
}) => {
  const router = useRouter();
  const { params } = useRequestParamsContext();
  const { data, error, isLoading } = useGetMovieQuery(params, {
    skip: !!initialDataList,
  });
  const { results, totalPages } = data || initialDataList || {};
  const { isDarkTheme } = useTheme();
  const movieRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const [loading, setLoading] = React.useState(true);

  const setMovieRef = (id: number, ref: HTMLLIElement | null): void => {
    movieRefs.current[id] = ref;
  };

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

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  const renderContent = (): React.ReactElement => {
    if (isLoading || loading) return <Loader />;
    if (error) return <div>Error loading movies</div>;

    return (
      <>
        <ListView data={results || []} setMovieRef={setMovieRef} />
        <Pagination
          currentPage={params.page}
          totalPages={totalPages || DEFAULT_PAGE}
        />
        <FavoritePopup />
      </>
    );
  };

  const renderMovieDetails = () => {
    if (params.details) {
      if (isLoading || loading) return;
      if (initialDataDetails)
        return <MovieDetails selectedMovie={initialDataDetails} />;
    }
  };

  return (
    <div
      data-theme={isDarkTheme ? 'dark' : 'light'}
      className="flex bg-muted w-full"
    >
      <div className="flex-1 flex">
        <div className="flex-1 border-r p-4 overflow-y-auto">
          <SearchBar />
          {renderContent()}
        </div>
        {renderMovieDetails()}
      </div>
    </div>
  );
};

export default Movies;
