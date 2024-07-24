import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { App } from '../app.tsx';
import store from '../store/store.tsx';

describe('App component', () => {
  test('renders Movies component as the default route', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(
      screen.getByRole('button', { name: /generate error/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /toggle theme mode/i })
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Search movies.../i)
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });
});
