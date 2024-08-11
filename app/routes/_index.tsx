import { json, type LoaderFunction, type MetaFunction } from '@remix-run/node';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { Loader } from '~/components/loader/loader';
import { MovieCardDetails } from '~/components/movie-card-details/movie-card-details';
import { MovieList } from '~/components/movie-list/movie-list';
import { SearchBar } from '~/components/search-bar/search-bar';
import { useTheme } from '~/hooks/use-theme';
import { ApiService } from '~/services/api';
import { MoviesDetails, MoviesItem } from '~/types/api';
import { getParams } from '~/utils/params';

export const meta: MetaFunction = () => {
  return [
    { title: 'React Movies' },
    {
      name: 'description',
      content: 'React Movie is a movie app built with React.',
    },
  ];
};

interface DataType {
  query: string;
  details: number;
  page: number;
  movieList: MoviesItem[];
  totalPages: number;
  movieDetails: MoviesDetails | null;
}

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const queryURL = url.searchParams.get('query') || '';
  const pageURL = url.searchParams.get('page') || '';
  const detailsURL = url.searchParams.get('details') || '';

  const params = getParams(pageURL, queryURL, detailsURL);
  const { query, details, page } = params;

  const movieData = await ApiService.fetchMovie(params);
  const { results: movieList, totalPages } = movieData || {};

  const movieDetails = params.details
    ? await ApiService.fetchMovieByID(details)
    : null;

  return json({ query, details, page, movieList, totalPages, movieDetails });
};

export default function Index() {
  const { query, details, page, movieList, totalPages, movieDetails } =
    useLoaderData<DataType>();
  const { isDarkTheme } = useTheme();
  const navigation = useNavigation();

  const renderContent = (): React.ReactElement => {
    return navigation.state === 'loading' ? (
      <Loader />
    ) : (
      <MovieList page={page} movieList={movieList} totalPages={totalPages} />
    );
  };

  const renderMovieDetails = (): React.ReactElement | null => {
    if (details) {
      return <MovieCardDetails movie={movieDetails} />;
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
          <SearchBar searchValue={query} />
          {renderContent()}
        </div>
        {renderMovieDetails()}
      </div>
    </div>
  );
}
