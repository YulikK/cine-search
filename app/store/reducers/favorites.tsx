import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoviesItem } from '~/types/api';

const initialState: MoviesItem[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<MoviesItem>) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<MoviesItem>) =>
      state.filter((movie) => movie.id !== action.payload.id),
    clearFavorites: () => [],
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export const favoritesReducer = favoritesSlice.reducer;
