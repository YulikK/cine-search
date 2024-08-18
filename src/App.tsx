import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import IndexPage from './pages';
import NotFoundPage from './pages/not-found';
import FormControlPage from './pages/form-control';
import FormUncontrolledPage from './pages/form-uncontrolled';
import { Provider } from 'react-redux';
import store from './store/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<IndexPage />} />
      <Route path="/form-control" element={<FormControlPage />} />
      <Route path="/form-uncontrolled" element={<FormUncontrolledPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </>
  )
);

export const App = () => (
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
