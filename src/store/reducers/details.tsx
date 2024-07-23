import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoviesDetails } from '../../types/api.tsx';

export interface MoviesDetailsState {
  details: MoviesDetails | null;
}

const initialState: MoviesDetailsState = {
  details: null,
};

const moviesDetailsSlice = createSlice({
  name: 'moviesDetails',
  initialState,
  reducers: {
    setMovieDetails(state, action: PayloadAction<MoviesDetails>) {
      state.details = action.payload;
    },
    clearMovieDetails(state) {
      state.details = null;
    },
  },
});
export const { setMovieDetails, clearMovieDetails } =
  moviesDetailsSlice.actions;

export const { reducer } = moviesDetailsSlice;
