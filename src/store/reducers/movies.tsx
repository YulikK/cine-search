import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MoviesDetails, MoviesItem } from '../../types/api.tsx';

export interface MoviesState {
  list: MoviesItem[];
  total: number;
  details: MoviesDetails | null;
}

const initialState: MoviesState = {
  list: [],
  total: 0,
  details: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMoviesList(state, action: PayloadAction<MoviesItem[]>) {
      state.list = action.payload;
    },
    setTotal(state, action: PayloadAction<number>) {
      state.total = action.payload;
    },
    setMovieDetails(state, action: PayloadAction<MoviesDetails | null>) {
      state.details = action.payload;
    },
  },
});

export const { setMoviesList, setMovieDetails, setTotal } = moviesSlice.actions;
export const { reducer } = moviesSlice;
