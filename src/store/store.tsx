import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as favoritesReducer } from './reducers/favorites.tsx';
import { moviesApi, moviesApiMiddleware } from '../services/api.tsx';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type PreloadStore = Partial<RootState>;

export const wrapper = createWrapper<AppStore>(() => makeStore());
