import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { favoritesReducer } from './reducers/favorites';
import { moviesReducer } from './reducers/movies';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  movies: moviesReducer,
});

export const makeStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof makeStore.dispatch;
