import React from 'react';
import { SearchIcon } from './icons/search-icon';
import { ErrorGenerator } from './error-generator';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
}

interface SearchBarState {
  searchQuery: string;
}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { searchQuery: props.value };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = this.state.searchQuery.trim();
    this.props.onSearch(trimmedQuery);
  };

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="max-w-6xl mx-auto px-4 md:px-6 py-8"
      >
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search movies..."
            value={this.state.searchQuery}
            onChange={this.handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            <SearchIcon className="h-5 w-5" />
          </button>
          <ErrorGenerator />
        </div>
      </form>
    );
  }
}
