import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Page404 } from './components/pages/404.tsx';
import { Movies } from './components/pages/movies.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Movies />}>
      <Route index element={<Movies />} />
      <Route path="*" element={<Page404 />} />
    </Route>
  )
);

export const App: React.FC = () => <RouterProvider router={router} />;
