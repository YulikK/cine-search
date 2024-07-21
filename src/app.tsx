import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Page404 } from './pages/404/404.tsx';
import { Movies } from './pages/movies/movies.tsx';
import { MovieDetails } from './components/movie-details/movie-details.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Movies />}>
      <Route path=":movieId" element={<MovieDetails />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

export const App: React.FC = () => <RouterProvider router={router} />;
