import React, { useEffect, useRef, useState } from 'react';
import { useGetMovieQuery } from '../services/api';
import { Loader } from '../components/loader/loader';
import { ListView } from '../components/list-view/list-view';
import { Pagination } from '../components/pagination/pagination';
import { DEFAULT_PAGE } from '../common/constant';
import { FavoritePopup } from '../components/popup-favorite/popup-favorite';
import { SearchBar } from '../components/search-bar/search-bar';
import { MovieDetails } from '../components/movie-details/movie-details';
import { useRequestParamsContext } from '../hooks/params-provider';
import { useTheme } from '../hooks/theme-provider';

const Movies: React.FC = () => {
  const { params } = useRequestParamsContext();
  const { data, error, isLoading } = useGetMovieQuery(params);
  const { results, totalPages } = data || {};
  const { isDarkTheme } = useTheme();
  const movieRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
  const [selectedMovieId, setSelectedMovieId] = useState(0);

  const setMovieRef = (id: number, ref: HTMLLIElement | null): void => {
    movieRefs.current[id] = ref;
  };

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
          currentPage={params.page}
          totalPages={totalPages || DEFAULT_PAGE}
        />
        <FavoritePopup />
      </>
    );
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
        {params.details !== 0 && <MovieDetails movieId={params.details} />}
      </div>
    </div>
  );
};

export default Movies;
