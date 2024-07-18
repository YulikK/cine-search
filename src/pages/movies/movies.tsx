import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { DEFAULT_PAGE } from '../../common/constant.tsx';
import { useRequestParams } from '../../hooks/use-request-params.tsx';
import { useGetMovieQuery } from '../../services/api.tsx';
import { Loader } from '../../components/loader/loader.tsx';
import { ListView } from '../../components/list-view/list-view.tsx';
import { Pagination } from '../../components/pagination/pagination.tsx';
import { ErrorBoundary } from '../../components/error-boundary/error-boundary.tsx';
import { SearchBar } from '../../components/search-bar/search-bar.tsx';

export const Movies: React.FC = () => {
  const navigate = useNavigate();
  const { searchParams, setSearchParams } = useRequestParams();
  const { movieId } = useParams();

  const query = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || `${DEFAULT_PAGE}`, 10);

  const { data, error, isLoading } = useGetMovieQuery({ query, page });

  const { results, totalPages } = data || {};

  const handleMovieClick = (id: string): void => {
    const saveSearchParams = new URLSearchParams(searchParams.toString());
    navigate(`/${id}`);
    setSearchParams(Object.fromEntries(saveSearchParams.entries()));
  };

  const handlerPageClick = (): void => {
    if (movieId) {
      const saveSearchParams = new URLSearchParams(searchParams.toString());
      navigate(`/`);
      setSearchParams(Object.fromEntries(saveSearchParams.entries()));
    }
  };

  const renderContent = (): React.ReactElement => {
    if (isLoading) return <Loader />;
    if (error) return <div>Error loading movies</div>;

    return (
      <>
        <ListView data={results || []} onMovieClick={handleMovieClick} />
        <Pagination
          currentPage={page}
          totalPages={totalPages || DEFAULT_PAGE}
        />
      </>
    );
  };

  return (
    <ErrorBoundary>
      <div className="flex h-screen w-full" onClick={handlerPageClick}>
        <div className="flex-1 border-r bg-muted p-4 overflow-y-auto">
          <SearchBar />
          {renderContent()}
        </div>
        <Outlet />
      </div>
    </ErrorBoundary>
  );
};
