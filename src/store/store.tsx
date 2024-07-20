import { configureStore } from '@reduxjs/toolkit';
import { reducer as favoritesReducer } from './reducers/favorites.tsx';
import { moviesApi, moviesApiMiddleware } from '../services/api.tsx';

const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesApiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;