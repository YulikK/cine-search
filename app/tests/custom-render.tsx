import { PropsWithChildren, ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { favoritesReducer } from '~/store/reducers/favorites';
import { moviesReducer } from '~/store/reducers/movies';
import { configureStore } from '@reduxjs/toolkit';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  movies: moviesReducer,
});

function makeTestStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });
}

type RootState = ReturnType<typeof rootReducer>;
type AppStore = ReturnType<typeof makeTestStore>;

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function customRender(
  component: ReactElement,
  {
    preloadedState = {},
    store = makeTestStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
): ExtendedRenderOptions {
  function Wrapper({ children }: PropsWithChildren): React.ReactElement {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
}
