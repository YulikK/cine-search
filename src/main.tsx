import React from 'react';
import ReactDOM from 'react-dom/client';
import { SearchBar } from './components/search-bar';
import { ListView } from './components/list-view';
import { ApiService } from './services/api';
import { MoviesItem, QueryParams } from './types/api';
import { DEFAULT_PAGE } from './common/constant';
import { getSearchQuery, saveSearchQuery } from './services/storage';
import Loader from './components/loader';
import ErrorBoundary from './components/error-boundary';
import ErrorGenerator from './components/error-generator';

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

  componentDidMount() {
    this.updateSearchQuery(getSearchQuery());
  }

  onSearch = (query: string) => {
    this.updateSearchQuery(query);
  };

  updateSearchQuery(query: string) {
    this.setState({ searchQuery: query }, () => {
      saveSearchQuery(query);
      this.getMovie(this.getQueryParams());
    });
  }

  getMovie(queryParams: QueryParams) {
    this.setState({ isLoading: true }); 
    ApiService.fetchMovie(queryParams).then((movies) => {
      this.setState({ movies, isLoading: false });
    });
  }

  getQueryParams() {
    return {
      query: this.state.searchQuery,
      page: this.state.page,
    };
  }
  render() {
    return (
      <React.StrictMode>
        <SearchBar onSearch={this.onSearch} value={this.state.searchQuery} />
        <ErrorBoundary>
          <ErrorGenerator/>
          {this.state.isLoading ? <Loader /> : <ListView data={this.state.movies} />}
        </ErrorBoundary>
      </React.StrictMode>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
