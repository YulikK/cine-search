// import React from 'react';
// import { describe, it, expect, vi } from 'vitest';
// import { render, screen } from '@testing-library/react';
// import { MemoryRouter } from 'react-router-dom';

// import { ListView } from './list-view.tsx';
// import { MoviesItem } from '../../types/api.tsx';

// vi.mock('./movie-card/movie-card.tsx', () => ({
//   MovieCard: ({ movie }: { movie: MoviesItem }): JSX.Element => (
//     <div data-tested="movie-card">{movie.name}</div>
//   ),
// }));
// vi.mock('./no-results.tsx', () => ({
//   NoResults: (): React.ReactElement => <div>No Results Found</div>,
// }));

// const mockData: MoviesItem[] = [
//   {
//     id: '1',
//     name: 'Movie 1',
//     description: 'Description 1',
//     posterPath: 'path1',
//     rating: 5,
//   },
//   {
//     id: '2',
//     name: 'Movie 2',
//     description: 'Description 2',
//     posterPath: 'path2',
//     rating: 4,
//   },
// ];

// describe('ListView Component', () => {
//   it('renders movie cards when data is provided', () => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <ListView data={mockData} onMovieClick={() => {}} />
//       </MemoryRouter>
//     );
//     const movieCards = screen.getAllByRole('listitem');
//     expect(movieCards.length).toBe(2);
//     expect(movieCards[0]).toHaveTextContent(mockData[0].name);
//     expect(movieCards[1]).toHaveTextContent(mockData[1].name);
//   });
//   it('renders "No Results" when data is empty', () => {
//     render(
//       <MemoryRouter initialEntries={['/']}>
//         <ListView data={[]} onMovieClick={() => {}} />
//       </MemoryRouter>
//     );
//     expect(screen.getByText('No results found')).toBeInTheDocument();
//   });
// });
