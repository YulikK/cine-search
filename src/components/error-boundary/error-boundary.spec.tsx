import { render, screen } from '@testing-library/react';
import React from 'react';
import { ErrorBoundary } from './error-boundary.tsx';

const ProblematicComponent: React.FC = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  test('displays the fallback UI when an error occurs in the child component', () => {
    render(
      <ErrorBoundary>
        <ProblematicComponent />
      </ErrorBoundary>
    );
    expect(
      screen.getByText(/oops, something went wrong!/i)
    ).toBeInTheDocument();
  });

  test('does not display the replacement UI if there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Content</div>
      </ErrorBoundary>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(
      screen.queryByText(/oops, something went wrong!/i)
    ).not.toBeInTheDocument();
  });
});
