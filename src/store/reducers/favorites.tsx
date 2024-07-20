import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string[] = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<string>) =>
      state.filter((movie) => movie !== action.payload),
    clearFavorites: () => [],
  },
});

export const { addFavorite, removeFavorite, clearFavorites } =
  favoritesSlice.actions;

export const { reducer } = favoritesSlice;
