import React from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  value: string;
}

interface SearchBarState {
  query: string;

}

export class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);
    this.state = { query: props.value };
  }
  

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target && event.target) {
      this.setState({ query: event.target.value });
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = this.state.query.trim();
    console.log(trimmedQuery);
    this.props.onSearch(trimmedQuery);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}
