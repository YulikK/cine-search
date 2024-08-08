import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { reducer as favoritesReducer } from './reducers/favorites.tsx';
import { reducer as moviesReducer } from './reducers/movies.tsx';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  movies: moviesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type PreloadStore = Partial<RootState>;
export type TypeStore = ReturnType<typeof configureStore>;

export const makeStore = (preloadedState?: PreloadStore): TypeStore =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
    preloadedState,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

// export type RootState = ReturnType<AppStore['getState']>;
