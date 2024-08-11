import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoviesDetails, MoviesItem } from '~/types/api';

export interface MoviesState {
  list: MoviesItem[];
  details: MoviesDetails | null;
}

const initialState: MoviesState = {
  list: [],
  details: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMoviesList(state, action: PayloadAction<MoviesItem[]>) {
      state.list = action.payload;
    },
    setMovieDetails(state, action: PayloadAction<MoviesDetails | null>) {
      state.details = action.payload;
    },
  },
});

export const { setMoviesList, setMovieDetails } = moviesSlice.actions;
export const moviesReducer = moviesSlice.reducer;
