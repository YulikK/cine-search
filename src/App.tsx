import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import IndexPage from './pages';
import NotFoundPage from './pages/not-found';
import FormControlPage from './pages/form-control';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} />
      <Route path="/form-control" element={<FormControlPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export const App = () => <RouterProvider router={router} />;
