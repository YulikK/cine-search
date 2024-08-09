import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { favoritesReducer } from './reducers/favorites';
import { moviesApi, moviesApiMiddleware } from '../services/api';

export const rootReducer = combineReducers({
  favorites: favoritesReducer,
  [moviesApi.reducerPath]: moviesApi.reducer,
});

export const makeStore = (preloadedState?: PreloadStore) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(moviesApiMiddleware),
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;

export type PreloadStore = Partial<RootState>;
export const wrapper = createWrapper<AppStore>(() => makeStore());
