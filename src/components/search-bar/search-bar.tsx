import React, { useEffect, useState } from 'react';
import { SearchIcon } from '../icons/search-icon/search-icon.tsx';
import { ErrorGenerator } from '../error-generator/error-generator.tsx';
import { DEFAULT_PAGE } from '../../common/constant.tsx';
import { ThemeToggle } from '../button-theme/button-theme.tsx';
import { useRequestParamsContext } from '../../hooks/params-provider.tsx';

export const SearchBar: React.FC = () => {
  const { params, setParams } = useRequestParamsContext();
  const [inputValue, setInputValue] = useState(params.query);

  useEffect(() => {
    setInputValue(params.query);
  }, [params.query]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    setParams({ ...params, query: inputValue.trim(), page: DEFAULT_PAGE });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto px-4 md:px-6 py-8"
    >
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search movies..."
          value={inputValue}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-ring h-10 px-4 py-2"
          aria-label="search"
        >
          <SearchIcon className="h-5 w-5" />
        </button>
        <ErrorGenerator />
        <ThemeToggle />
      </div>
    </form>
  );
};
