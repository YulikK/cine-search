import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom/client';
import { SearchBar } from './components/search-bar.tsx';
import { ListView } from './components/list-view.tsx';
import { ApiService } from './services/api.tsx';
import { MoviesItem, QueryParams } from './types/api.tsx';
import { DEFAULT_PAGE } from './common/constant.tsx';
import { getSearchQuery, saveSearchQuery } from './services/storage.tsx';
import { Loader } from './components/loader.tsx';
import { ErrorBoundary } from './components/error-boundary.tsx';
import './assets/styles/global.scss';

interface AppProps {}
interface AppState {
  movies: MoviesItem[];
  page: number;
  searchQuery: string;
  isLoading: boolean;
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      movies: [],
      page: DEFAULT_PAGE,
      searchQuery: getSearchQuery(),
      isLoading: false,
    };
  }

  componentDidMount(): void {
    this.updateSearchQuery(getSearchQuery());
  }

  onSearch = (query: string): void => {
    this.updateSearchQuery(query);
  };

  updateSearchQuery(query: string): void {
    this.setState({ searchQuery: query }, () => {
      saveSearchQuery(query);
      this.getMovie(this.getQueryParams());
    });
  }

  getMovie(queryParams: QueryParams): void {
    this.setState({ isLoading: true });
    ApiService.fetchMovie(queryParams)
      .then((movies) => {
        this.setState({ movies: movies || [], isLoading: false });
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  getQueryParams(): QueryParams {
    return {
      query: this.state.searchQuery,
      page: this.state.page,
    };
  }

  render(): ReactNode {
    return (
      <React.StrictMode>
        <ErrorBoundary>
          <div className="container mx-auto px-4 py-8">
            <SearchBar
              onSearch={this.onSearch}
              value={this.state.searchQuery}
            />

            {this.state.isLoading ? (
              <Loader />
            ) : (
              <ListView data={this.state.movies} />
            )}
          </div>
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
