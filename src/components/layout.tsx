import React from 'react';
import { Outlet } from 'react-router-dom';
import { ErrorBoundary } from './error-boundary.tsx';
import { SearchBar } from './search-bar.tsx';

export const Layout: React.FC = () => (
  <ErrorBoundary>
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      <Outlet />
    </div>
  </ErrorBoundary>
);
