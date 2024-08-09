import { describe, it, expect } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import React from 'react';
import { customRender } from '../custom-render.tsx';
import Movies from '../../app/page.tsx';

const searchParams = { query: 'test', details: '1', page: '1' };

describe('Movies Page Component', () => {
  it('renders search bar and movie list', async () => {
    vi.mock('../../app/(list)/movie-list.tsx', () => ({
      MovieList: (): React.ReactElement => <div>Mocked Movie List</div>,
    }));

    vi.mock('../../app/(details)/movie-card-details.tsx', () => ({
      MovieCardDetails: (): React.ReactElement => (
        <div>Mocked Movie Card Details</div>
      ),
    }));

    customRender(<Movies searchParams={searchParams} />);

    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Mocked Movie List')).toBeInTheDocument();
      expect(screen.getByText('Mocked Movie Card Details')).toBeInTheDocument();
    });
  });
});
